from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from django.db.models import Q
import os
from datetime import datetime

from .models import *
from .serializers import *
from .RecSys import *
from django.conf import settings


@csrf_exempt
def UserApi(request,id=0):
    if request.method=='GET':
        Users = User.objects.all()
        Serializer=UserSerializer(Users,many=True)
        return JsonResponse(Serializer.data,safe=False)
    elif request.method=='POST':
        data=JSONParser().parse(request)
        serializer=UserSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully",safe=False)
        return JsonResponse("Failed to Add",safe=False)
    elif request.method=='PUT':
        data=JSONParser().parse(request)
        Users=User.objects.get(id=data['id'])
        serializer=UserSerializer(Users,data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully",safe=False)
        return JsonResponse("Failed to Update")
    elif request.method=='DELETE':
        Users=User.objects.get(id=id)
        Users.delete()
        return JsonResponse("Deleted Successfully",safe=False)
    
@csrf_exempt
def VRUserApi(request):
    if request.method=='POST':
        data=JSONParser().parse(request)
        user = User.objects.filter(Q(UserName=data['UserName']) | Q(Email=data['UserName']))
        if len(user)>0:
            if user[0].PassWord==data['PassWord']:
                Serializer=UserSerializer(user,many=True)
                return JsonResponse(Serializer.data,safe=False)
            else :
                return JsonResponse("Password incorrect",safe=False)
        else : return JsonResponse("user not found",safe=False)
@csrf_exempt
def GetUserApi(request): # remove personnel Data
    if request.method=='POST':
        data=JSONParser().parse(request)
        user = User.objects.filter(Q(UserName=data['UserName']) | Q(Email=data['UserName']))
        if len(user)>0:
            Serializer=UserSerializer(user,many=True)
            return JsonResponse(Serializer.data,safe=False)
        else : return JsonResponse("user not found",safe=False)
@csrf_exempt
def GetUsersEmailApi(request):
    if request.method=='POST':
        data=JSONParser().parse(request)
        user = User.objects.filter(id__in=data)
        Serializer=UserEmailSerializer(user,many=True)
        return JsonResponse(Serializer.data,safe=False)

@csrf_exempt
def WorkerApi(request, id=0,inf=0,sup=12): 
    if request.method == 'GET':
        workers = Worker.objects.all().order_by('-Rating')[inf:sup]
        serializer = WorkerPublicSerializer(workers, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = WorkerSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        worker = Worker.objects.get(id=data['id'])
        serializer = WorkerSerializer(worker, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method == 'DELETE':
        worker = Worker.objects.get(id=id)
        worker.delete()
        return JsonResponse("Deleted Successfully", safe=False)
@csrf_exempt
def UserToWorker(request, id):
    if request.method == 'POST':
        try:
            user = User.objects.get(id=id)
        except User.DoesNotExist:
            return JsonResponse('User does not exist.',safe=False)
        data=JSONParser().parse(request)
        serializer = WorkerSerializer(data=data)
        user.delete()
        if serializer.is_valid(raise_exception=True):    
            worker = serializer.save()
            new_Worker_serializer = WorkerSerializer(worker)

            return JsonResponse(new_Worker_serializer.data,safe=False)
        return JsonResponse("Data not valide",safe=False)

@csrf_exempt
def GetWorkerApi(request):
    if request.method=='POST':
        data=JSONParser().parse(request)
        user = Worker.objects.filter(Q(UserName=data['UserName']) | Q(Email=data['UserName']))
        if len(user)>0:
            Serializer=WorkerPublicSerializer(user,many=True)
            return JsonResponse(Serializer.data,safe=False)
        else : return JsonResponse("user not found",safe=False)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        worker = Worker.objects.get(id=data['id'])
        serializer = WorkerPublicSerializer(worker, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")
@csrf_exempt
def GettheseWorkersApi(request):
    if request.method=='POST':
        data=JSONParser().parse(request)
        user = Worker.objects.filter(id__in=data).order_by('-Rating')
        Serializer=WorkerPublicSerializer(user,many=True)
        return JsonResponse(Serializer.data,safe=False)
@csrf_exempt
def GetWorkerPrvApi(request):
    if request.method=='POST':
        data=JSONParser().parse(request)
        user = Worker.objects.filter(Q(UserName=data['UserName']) | Q(Email=data['UserName']))
        if len(user)>0:
            Serializer=WorkerSerializer(user,many=True)
            return JsonResponse(Serializer.data,safe=False)
        else : return JsonResponse("user not found",safe=False)

@csrf_exempt
def LinksProfileApi(request, id=0):
    if request.method == 'GET':
        links_profiles = LinksProfile.objects.filter(Worker=id)
        serializer = LinksProfileSerializer(links_profiles, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        MsgResponde='Failed to Add'
        for obj_data in data:
            serializer = LinksProfileSerializer(data=obj_data)
            if serializer.is_valid():
                serializer.save()
                MsgResponde= "Added Successfully"
        return JsonResponse(MsgResponde, safe=False)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        MsgResponde='Failed to Update'
        links_profile = LinksProfile.objects.get(id=data['id'])
        for obj_data in data:
            serializer = LinksProfileSerializer(links_profile, data=obj_data)
            if serializer.is_valid():
                serializer.save()
                MsgResponde="Updated Successfully"
        return JsonResponse(MsgResponde, safe=False)
    elif request.method == 'DELETE':
        data = JSONParser().parse(request)
        for obj_data in data:
            links_profile = LinksProfile.objects.get(id=obj_data)
            links_profile.delete()
            return JsonResponse("Deleted Successfully", safe=False)
        return JsonResponse("No Deleted", safe=False)

@csrf_exempt
def WorkerMetriseApi(request, id=0):
    if request.method == 'GET':
        worker_metrises = workerMaitrise.objects.filter(Worker=id)
        serializer = WorkerMaitriseSerializerFull(worker_metrises, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        MsgResponde='Failed to Add'
        for obj_data in data:
            serializer = WorkerMaitriseSerializer(data=obj_data)        
            if serializer.is_valid():
                serializer.save()
                MsgResponde= "Added Successfully"
        return JsonResponse(MsgResponde, safe=False)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        MsgResponde='Failed to Update'
        worker_metrise = workerMaitrise.objects.get(id=data['id'])
        for obj_data in data:
            serializer = WorkerMaitriseSerializer(data=obj_data) 
            if serializer.is_valid():
                serializer.save()
                MsgResponde="Updated Successfully"
        return JsonResponse(MsgResponde, safe=False)
    elif request.method == 'DELETE':
        data = JSONParser().parse(request)
        for obj_data in data:
            worker_metrise = workerMaitrise.objects.get(id=obj_data)
            worker_metrise.delete()
            return JsonResponse("Deleted Successfully", safe=False)
        return JsonResponse("No Deleted", safe=False)

@csrf_exempt
def ApplyForApi(request, Wid=0, Jid=0):
    if request.method == 'GET':
        Apply_fors = Apply_For.objects.all()
        serializer = ApplyForSerializer(Apply_fors, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ApplyForSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Apply send", safe=False)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        Apply_for = Apply_For.objects.get(id=data['id'])
        serializer = ApplyForSerializer(Apply_for, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        Apply_for = Apply_For.objects.filter(Worker=Wid , Job=Jid)
        Apply_for.delete()
        return JsonResponse("Deleted Successfully", safe=False)
@csrf_exempt
def WorkerApplyForApi(request, id=0):
    if request.method == 'GET':
        Apply_fors = Apply_For.objects.filter(Worker=id)
        serializer = ApplyForSerializer(Apply_fors, many=True)
        ApplyJobs = [job['Job'] for job in serializer.data]
        return JsonResponse(ApplyJobs, safe=False)
@csrf_exempt
def WorkerJobsApi(request, id=0):
    if request.method == 'GET':
        Apply_fors = Apply_For.objects.filter(Q(Worker=id) & Q(State=1))
        serializerApply = ApplyForSerializer(Apply_fors, many=True)
        WorkJobs = [job['Job'] for job in serializerApply.data]
        jobs = Jobs.objects.filter(id__in=WorkJobs)
        serializerJobs = JobsSerializer(jobs, many=True)
        WorkProject = [job['Project'] for job in serializerJobs.data]
        project = Project.objects.filter(id__in=WorkProject)
        serializerProject = ProjectManagerSerializer(project, many=True)
        return JsonResponse(serializerProject.data, safe=False)
@csrf_exempt
def JobApplyersApi(request, id=0):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        Apply_fors = Apply_For.objects.filter(Job__in=data)
        serializer = ApplyersSerializer(Apply_fors, many=True)
        return JsonResponse(serializer.data, safe=False)  

@csrf_exempt
def SkillApi(request,id=0):
    if request.method=='GET':
        skills = Skill.objects.all()
        serializer=SkillSerializer(skills,many=True)
        return JsonResponse(serializer.data,safe=False)

@csrf_exempt
def SearchApi(request,id=0):
    if request.method == 'GET':
        Searchs = Search.objects.filter(Q(user=id) & Q(count__gt=2)).order_by('-count', '-Time')[0:12]
        serializer = SearchSerializer(Searchs, many=True)
        search_contents  = [S['content'] for S in serializer.data]
        return JsonResponse(search_contents , safe=False)
    if request.method == 'POST':
        data = JSONParser().parse(request)
        searches = Search.objects.filter(content=data['content'])
        if len(searches) == 0:
            serializer = SearchSerializer(data=data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse("Search Added", safe=False)
        else:
            data['count']=searches[0].count+1
            serializer = SearchSerializer(searches[0], data=data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        Searchs = Search.objects.filter(user=id)
        Searchs.delete()
        return JsonResponse("Deleted Successfully", safe=False)
    
@csrf_exempt
def InterestedJobsApi(request,idWorker=0,idJob=0):
    if request.method == 'GET':
        InterestedJobss = InterestedJobs.objects.filter(Worker=idWorker,Job=idJob)
        if len(InterestedJobss) == 0:
            serializer = InterestedJobsSerializer(data={"Worker":idWorker,"Job":idJob,"Time":datetime.now()})
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, safe=False)
            return JsonResponse(serializer.errors,safe=False)
        else:
            updated_data = {
                'Worker': InterestedJobss[0].Worker.id,
                'Job': InterestedJobss[0].Job.id,
                'Viewcount': InterestedJobss[0].Viewcount+1,
                'Time': datetime.now(),
            }
            serializer = InterestedJobsSerializer(instance=InterestedJobss[0], data=updated_data)
            if serializer.is_valid():
                serializer.save()
                return JsonResponse(serializer.data, safe=False)
            return JsonResponse(serializer.errors,safe=False)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        InterestedJobss = InterestedJobs.objects.get(id=data['id'])
        serializer = InterestedJobsSerializer(InterestedJobss, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse(serializer.errors, status=400)        
@csrf_exempt
def PreposeJobsApi(request,idWorker=0):
    if request.method == 'GET':
        InterestedJobss = InterestedJobs.objects.filter(Worker=idWorker).order_by("-Time")[0:200]
        if len(InterestedJobss)==0:
            InterestedJobss = InterestedJobs.objects.all().order_by("-Time")[0:200]
        Serializer=InterestedJobsSerializer(InterestedJobss,many=True)
        JobsIds  = [S['id'] for S in Serializer.data]
        InterestedJobss =InterestedJobs.objects.filter(id__in=JobsIds).order_by("-Viewcount")[0:10]  
        Serializer=InterestedJobsSerializer(InterestedJobss,many=True)
        JobsIds  = [S['Job'] for S in Serializer.data]
        jobs = Jobs.objects.filter(id__in=JobsIds)
        Serializer=JobsSerializer(jobs,many=True)
        return JsonResponse(Serializer.data,safe=False)
@csrf_exempt
def HistJobsApi(request,idWorker=0):
    if request.method == 'GET':
        InterestedJobss = InterestedJobs.objects.filter(Worker_id=idWorker,Is_saved=True).order_by("-Time")
        Serializer=InterestedJobsSerializer(InterestedJobss,many=True)
        JobsIds  = [S['Job'] for S in Serializer.data]
        jobs = Jobs.objects.filter(id__in=JobsIds)
        Serializer=JobsSerializer(jobs,many=True)
        return JsonResponse(Serializer.data,safe=False)
#Project
@csrf_exempt
def ProjectApi(request, id=0):
    if request.method == 'GET':
        projects = Project.objects.filter(Manager_id=id).order_by('-Date')
        serializer = ProjectManagerSerializer(projects, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ProjectSerializer(data=data)
        if serializer.is_valid():
            project = serializer.save()
            new_project_serializer = ProjectSerializer(project)
            return JsonResponse(new_project_serializer.data, safe=False)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        project = Project.objects.get(id=data['id'])
        serializer = ProjectSerializer(project, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse(serializer.errors, status=400)
    elif request.method == 'DELETE':
        project = Project.objects.get(id=id)
        project.delete()
        return JsonResponse("Deleted Successfully", safe=False)
@csrf_exempt
def GETProjectApi(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        Projects = Project.objects.filter(id__in=data).order_by('-Date')
        serializer = ProjectManagerSerializer(Projects, many=True)
        return JsonResponse(serializer.data, safe=False)
@csrf_exempt
def GETStatApi(request):
    if request.method == 'GET':
        Projects = Project.objects.all().count()
        Creators = Worker.objects.all().count()
        jobs = Jobs.objects.all().count()
        return JsonResponse({"Projects":Projects,"Creators":Creators,"jobs":jobs}, safe=False)
          
@csrf_exempt
def JobsApi(request, id=0):
    if request.method == 'GET':
        Jobss = Jobs.objects.all()
        serializer = JobsSerializer(Jobss, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = JobsSerializer(data=data)
        if serializer.is_valid():
            job = serializer.save()
            new_job_serializer = JobsSerializer(job)
            return JsonResponse(new_job_serializer.data, safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        Jobss = Jobs.objects.get(id=data['id'])
        serializer = JobsSerializer(Jobss, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update", safe=False)
    elif request.method == 'DELETE':
        Jobss = Jobs.objects.get(id=id)
        Jobss.delete()
        return JsonResponse("Deleted Successfully", safe=False)

@csrf_exempt
def GETJobsApi(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        Jobss = Jobs.objects.filter(id__in=data)
        serializer = JobsSerializer(Jobss, many=True)
        return JsonResponse(serializer.data, safe=False)
@csrf_exempt
def GETProjefctJobsApi(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        Jobss = Jobs.objects.filter(Project__in=data)
        serializer = JobsSerializer(Jobss, many=True)
        return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def ProjectRequiredApi(request, id=0):
    if request.method == 'GET':
        projects_required = ProjectRequired.objects.filter(Job=id)
        serializer = ProjectRequiredSerializerFull(projects_required, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        MsgResponde='Failed to Add'
        for obj_data in data:    
            serializer = ProjectRequiredSerializer(data=obj_data)
            if serializer.is_valid():
                serializer.save()
                MsgResponde= "Added Successfully"
        return JsonResponse(MsgResponde, safe=False)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        MsgResponde='Failed to Update'
        project_required = ProjectRequired.objects.get(id=data['id'])
        for obj_data in data:  
            serializer = ProjectRequiredSerializer(project_required, data=data)
            if serializer.is_valid():
                serializer.save()
                MsgResponde="Updated Successfully"
        return JsonResponse(MsgResponde, safe=False)
    elif request.method == 'DELETE':
        data = JSONParser().parse(request)
        for X in data:
            project_required = ProjectRequired.objects.get(id=X) 
            project_required.delete()
        return JsonResponse("Deleted Successfully", safe=False)
@csrf_exempt
def GETProjectRequiredApi(request):
    if request.method == 'POST':
        data = JSONParser().parse(request)
        projects_required = ProjectRequired.objects.filter(Job__in=data)
        serializer = ProjectRequiredSerializerFull(projects_required, many=True)
        return JsonResponse(serializer.data, safe=False)
#Post
@csrf_exempt
def PostApi(request, id=0):
    if request.method == 'GET':
        posts = Post.objects.all()
        serializer = PostSerializer(posts, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = PostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        post = Post.objects.get(id=data['id'])
        serializer = PostSerializer(post, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
        post = Post.objects.get(id=id)
        post.delete()
        return JsonResponse("Deleted Successfully", safe=False)
@csrf_exempt
def ProfilePostApi(request, id=0):
    if request.method == 'GET':
        posts = Post.objects.filter(id=id)
        serializer = PostSerializer(posts, many=True)
        return JsonResponse(serializer.data, safe=False)
@csrf_exempt
def LinksPostApi(request, id=0):
    if request.method == 'GET':
        links_posts = LinksPost.objects.all()
        serializer = LinksPostSerializer(links_posts, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = LinksPostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        links_post = LinksPost.objects.get(id=data['id'])
        serializer = LinksPostSerializer(links_post, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
        links_post = LinksPost.objects.get(id=id)
        links_post.delete()
        return JsonResponse("Deleted Successfully", safe=False)
@csrf_exempt
def RateWorkerApi(request, rater=0,Worker=0): 
    if request.method == 'GET':
        RateWorkers = RateWorker.objects.filter(Q(Rater=rater)&Q(Worker=Worker))
        serializer = RateWorkerSerializer(RateWorkers, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = RateWorkerSerializer(data=data)
        if serializer.is_valid():
            Rate = serializer.save()
            new_Rate_serializer = RateWorkerSerializer(Rate)
            return JsonResponse(new_Rate_serializer.data, safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        RateWorkers = RateWorker.objects.get(id=data['id'])
        serializer = RateWorkerSerializer(RateWorkers, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
        RateWorkers = RateWorker.objects.get(id=id)
        RateWorkers.delete()
        return JsonResponse("Deleted Successfully", safe=False)
    
@csrf_exempt
def ImageApi(request, id=0):
    if request.method == 'GET':
        images = Image.objects.all()
        serializer = ImageSerializer(images, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ImageSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        image = Image.objects.get(id=data['id'])
        serializer = ImageSerializer(image, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
        image = Image.objects.get(id=id)
        image.delete()
        return JsonResponse("Deleted Successfully", safe=False)

@csrf_exempt
def CommentApi(request, id=0):
    if request.method == 'GET':
        commentss = Comments.objects.all()
        serializer = CommentsSerializer(commentss, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = CommentsSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        comments = Comments.objects.get(id=data['id'])
        serializer = CommentsSerializer(comments, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
        comments = Comments.objects.get(id=id)
        comments.delete()
        return JsonResponse("Deleted Successfully", safe=False)

@csrf_exempt
def HistoryPostApi(request, id=0):
    if request.method == 'GET':
        history_posts = HistoryPost.objects.all()
        serializer = HistoryPostSerializer(history_posts, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = HistoryPostSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        history_post = HistoryPost.objects.get(id=data['id'])
        serializer = HistoryPostSerializer(history_post, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
        history_post = HistoryPost.objects.get(id=id)
        history_post.delete()
        return JsonResponse("Deleted Successfully", safe=False)
#chat
@csrf_exempt
def conversation_api(request, id=0):
    if request.method == 'GET':
        conversations = Conversation.objects.all()
        serializer = ConversationSerializer(conversations, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = ConversationSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        conversation = Conversation.objects.get(id=data['id'])
        serializer = ConversationSerializer(conversation, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
        conversation = Conversation.objects.get(id=id)
        conversation.delete()
        return JsonResponse("Deleted Successfully", safe=False)
@csrf_exempt
def message_api(request, id=0):
    if request.method == 'GET':
        messagess = Messages.objects.all()
        serializer = MessagesSerializer(messagess, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = MessagesSerializer(data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Added Successfully", safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        messages = Messages.objects.get(id=data['id'])
        serializer = MessagesSerializer(messages, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
        messages = Messages.objects.get(id=id)
        messages.delete()
        return JsonResponse("Deleted Successfully", safe=False)
#Notifications
@csrf_exempt
def notification_api(request, id=0):
    if request.method == 'GET':
        notifications = Notification.objects.all()
        serializer = NotificationSerializer(notifications, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        serializer = NotificationSerializer(data=data)
        if serializer.is_valid():
            notification = serializer.save()
            new_Notification_serializer = NotificationSerializer(notification)
            return JsonResponse(new_Notification_serializer.data, safe=False)
        return JsonResponse("Failed to Add", safe=False)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        notification = Notification.objects.get(id=data['id'])
        serializer = NotificationSerializer(notification, data=data)
        if serializer.is_valid():
            serializer.save()
            return JsonResponse("Updated Successfully", safe=False)
        return JsonResponse("Failed to Update")
    elif request.method == 'DELETE':
        notification = Notification.objects.get(id=id)
        notification.delete()
        return JsonResponse("Deleted Successfully", safe=False)

@csrf_exempt
def NotifUserApi(request, id=0):
    if request.method == 'GET':
        notif_users = NotifUser.objects.filter(UserNot=id)
        serializer = NotifUserPlusSerializer(notif_users, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        data = JSONParser().parse(request)
        MsgResponde='Failed to Add'
        for obj_data in data:    
            serializer = NotifUserSerializer(data=obj_data)
            if serializer.is_valid():
                serializer.save()
                MsgResponde= "Added Successfully"
        return JsonResponse(MsgResponde, safe=False)
    elif request.method == 'PUT':
        data = JSONParser().parse(request)
        MsgResponde='Failed to Update'
        Notif_required = NotifUser.objects.get(id=data['id'])
        for obj_data in data:  
            serializer = NotifUserSerializer(Notif_required, data=data)
            if serializer.is_valid():
                serializer.save()
                MsgResponde="Updated Successfully"
        return JsonResponse(MsgResponde, safe=False)
    elif request.method == 'DELETE':
        notif_user = NotifUser.objects.get(id=id)
        notif_user.delete()
        return JsonResponse("Deleted Successfully", safe=False)
    
@csrf_exempt
def SaveFile(request):
    file=request.FILES['file']
    file_name=default_storage.save(file.name,file)
    return JsonResponse(file_name,safe=False)

def delete_file(request, file_name):
    file_path = os.path.join(settings.MEDIA_ROOT, file_name)
    if os.path.exists(file_path):
        os.remove(file_path)
        return JsonResponse({'message': f'{file_name} has been deleted.'})
    else:
        return JsonResponse({'error': f'{file_name} does not exist.'})
