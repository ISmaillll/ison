from django.views.decorators.csrf import csrf_exempt
from .models import *
from .serializers import *
from django.http.response import JsonResponse
from rest_framework.parsers import JSONParser

import pandas as pd
import json
import csv
import pickle
from sklearn.linear_model import LinearRegression
from django.db.models import Sum
from django.core.files.storage import default_storage

@csrf_exempt
def ExportDAtaCsv(request):
    if request.method == 'GET':
        workers = Worker.objects.all()
        serializer = WorkerRecSerializer(workers, many=True)
        dataW= serializer.data
        saveCsv(dataW,'Workers.csv')

        worker_metrises = workerMaitrise.objects.all()
        serializer = WorkerMaitriseSerializer(worker_metrises, many=True)
        dataS= serializer.data
        saveCsv(dataS,'WSkills.csv')
        return JsonResponse("all good",safe=False)

def saveCsv(data,fileName):
        with open(fileName, 'w', encoding='UTF8', newline='') as f:
            writer = csv.writer(f)
            count = 0
            for D in data:
                if count == 0:
                    header = D.keys()
                    writer.writerow(header)
                    count += 1
                writer.writerow(D.values())
            f.close()

@csrf_exempt
def predictWorkers(request,Profession):    #pip install scikit-learn pandas
    if request.method == 'POST': 
        loaded_model = pickle.load(open('./model_Recommend_job.pkl', 'rb'))
        
        JobSkills = JSONParser().parse(request) 
        workers = Worker.objects.filter(Avalble=1)

        JobSkillIds = [skill['Skill'] for skill in JobSkills] # get skills id 
        JobSkillRatingSum = sum([skill['Skill_Rating'] for skill in JobSkills]) # sum Skill Rating

        filtered_skills = workerMaitrise.objects.filter(Skill__in=JobSkillIds)
       
        filtered_skills = pd.DataFrame(list(filtered_skills.values()))
        workers_data = pd.DataFrame(list(workers.values()))

        worker_skill_ratings = filtered_skills.groupby('Worker_id')['Skill_Rating'].sum().reset_index()
        worker_skill_ratings['Skill_Rating'] = worker_skill_ratings['Skill_Rating'].div(JobSkillRatingSum).mul(100)
        
        workers_data['Profession'] = workers_data.apply(lambda x: 1 if x['Profession'].lower().find(Profession.lower())!=-1 else 0, axis=1)

        workers = pd.merge(workers_data, worker_skill_ratings, left_on='id', right_on='Worker_id')
        workers.drop(['UserName','Name','Lastname','Email','Nbr_Post','Worker_id','PassWord','ProfilePhoto','CartHolder','Education_Level','Bio','Criditcart','cardYear','cardMonth','CVV','Is_Worker','Avalble','user_ptr_id'],axis='columns',inplace=True)
        workers = workers.rename(columns={'Skill_Rating': 'Skill_Percentage_Required'})
        workers.iloc[:, [3, 2]] = workers.iloc[:, [2, 3]]
        workers.rename(columns={'Nbr_Rating': 'temp', 'Rating': 'Nbr_Rating'}, inplace=True)
        workers.rename(columns={'temp': 'Rating'}, inplace=True)

        prediction = loaded_model.predict(workers)
        print("Résultats probabilistes")
        print(loaded_model.predict_proba(workers))
        print("Résultats predictions")
        print(prediction)
        Rec_Workers = pd.concat([workers, pd.DataFrame(prediction, columns=["prediction"])], axis=1)
        print("Résultats predictions pour chaque Travailleur")
        print(Rec_Workers)
        Rec_Workers = Rec_Workers[Rec_Workers['prediction'] == 1]
        Rec_Workers = Rec_Workers.to_json(orient='records')
        Rec_Workers = json.loads(Rec_Workers)

        return JsonResponse(Rec_Workers, safe=False)

@csrf_exempt
def predictJobs(request,Profession):
    if request.method == 'POST': 
        loaded_model = pickle.load(open('./model_Recommend_Worker.pkl', 'rb'))
        
        WorkerSkill = JSONParser().parse(request) 
        jobs = Jobs.objects.filter(State='Avalble')
        
        WorkerSkillIds = [skill['Skill']['id'] for skill in WorkerSkill] # get skills id 
        WorkerSkillRatingSum = sum([skill['Skill_Rating'] for skill in WorkerSkill]) # sum Skill Rating

        filtered_skills = ProjectRequired.objects.filter(Skill__in=WorkerSkillIds)

        filtered_skills = pd.DataFrame(list(filtered_skills.values()))
        Jobs_data = pd.DataFrame(list(jobs.values()))
        JobIds='ALL'
        if not filtered_skills.empty:
            Jobs_skill_ratings = filtered_skills.groupby('Job_id')['Skill_Rating'].sum().reset_index()
            Jobs_skill_ratings['Skill_Rating'] = Jobs_skill_ratings['Skill_Rating'].div(WorkerSkillRatingSum).mul(100)
            
            Jobs_data['Job'] = Jobs_data.apply(lambda x: 1 if x['Job'].lower().find(Profession.lower())!=-1 else 0, axis=1)

            jobs = pd.merge(Jobs_data, Jobs_skill_ratings, left_on='id', right_on='Job_id')
            jobs.drop(['Job_id','Project_id','Payment','State','Date','Description'],axis='columns',inplace=True)
            jobs = jobs.rename(columns={'Skill_Rating': 'Skill_Percentage_Required','Job':'Profession'})

            prediction = loaded_model.predict(jobs)
            Rec_Jobs = pd.concat([jobs, pd.DataFrame(prediction, columns=["prediction"])], axis=1)
            Rec_Jobs = Rec_Jobs[Rec_Jobs['prediction'] == 1]
            Rec_Jobs = Rec_Jobs.to_json(orient='records')
            Rec_Jobs = json.loads(Rec_Jobs)
            JobIds = [Job['id'] for Job in Rec_Jobs]

        return JsonResponse(JobIds, safe=False)
    
@csrf_exempt
def SearchJobsApi(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        search = data.split(' ')
        jobs = Jobs.objects.filter(State='Avalble').order_by("-Date")
        jobs = pd.DataFrame(list(jobs.values()))
        Jobskills = ProjectRequired.objects.all()
        Jobskills = pd.DataFrame(list(Jobskills.values()))
        skills = Skill.objects.all()
        skills = pd.DataFrame(list(skills.values()))

        job_skills = pd.merge(Jobskills, skills[['id', 'skill']], how='left', left_on='Skill_id', right_on='id')
        job_skills.drop(['Skill_id','id_x','id_y','Skill_Rating'], axis=1, inplace=True)
        job_skills = job_skills.groupby('Job_id')['skill'].apply(lambda x: ','.join(x)).reset_index() # join skills in string 
        job_skills = pd.merge(jobs,job_skills,left_on='id', right_on='Job_id')
        job_skills.drop(['Job_id'], axis=1, inplace=True)

        conditions = []
        for s in search:
            conditions.append(job_skills['Job'].str.lower().str.contains(s.lower().strip()))
            conditions.append(job_skills['skill'].str.lower().str.contains(s.lower().strip()))
        
        filtered_job_skills = job_skills.loc[pd.concat(conditions, axis=1).any(axis=1)]

        Rec_Jobs = filtered_job_skills.to_json(orient='records')
        Rec_Jobs = json.loads(Rec_Jobs)
        JobIds = [Job['id'] for Job in Rec_Jobs]

        return JsonResponse(JobIds, safe=False)
        
@csrf_exempt
def SearchWorkersApi(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        search = data.split(' ')
        Workers = Worker.objects.all().order_by("-Rating")
        Workers = pd.DataFrame(list(Workers.values()))

        conditions = []
        for s in search:
            conditions.append(Workers['UserName'].str.lower().str.contains(s.lower().strip()))
            conditions.append(Workers['Name'].str.lower().str.contains(s.lower().strip()))
            conditions.append(Workers['Lastname'].str.lower().str.contains(s.lower().strip()))
            conditions.append(Workers['Profession'].str.lower().str.contains(s.lower().strip()))
            conditions.append(Workers['Education_Level'].str.lower().str.contains(s.lower().strip()))
            #conditions.append(Workers['Rating'].str.lower().str.contains(s.lower().strip()))
        
        filtered_Workers= Workers.loc[pd.concat(conditions, axis=1).any(axis=1)]

        SearchWorkers = filtered_Workers.to_json(orient='records')
        SearchWorkers = json.loads(SearchWorkers)
        WorkersIds = [Job['id'] for Job in SearchWorkers]

        return JsonResponse(WorkersIds, safe=False)