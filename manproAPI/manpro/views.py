from django.views.decorators.csrf import csrf_exempt
from rest_framework.parsers import JSONParser
from django.http.response import JsonResponse
from rest_framework.generics import ListCreateAPIView,ListAPIView, RetrieveDestroyAPIView,ListAPIView,RetrieveUpdateDestroyAPIView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status

from django.db.models import Q
import os
from datetime import datetime

from .models import *
from .serializers import *
from .RecSys import *
from django.conf import settings
from .signals import delete_image_file 
from django.core.paginator import Paginator
from django.core.exceptions import ObjectDoesNotExist

# User
class UserListCreateView(ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

class UserRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    
@csrf_exempt
def VRUserApi(request): # Login Home
    if request.method=='POST':
        data=JSONParser().parse(request)
        user = User.objects.filter(Q(UserName=data['UserName']) | Q(Email=data['UserName']))
        if len(user)>0:
            if user[0].PassWord==data['PassWord']:
                Serializer=UserSerializer(user,many=True)
                return JsonResponse({"exist":True,"Password":True,"data":Serializer.data})
            else :
                return JsonResponse({"exist":True,"Password":False,"data":[]})
        else : return JsonResponse({"exist":False,"Password":False,"data":[]})
@csrf_exempt
def ExistUserApi(request,user): # Register User
    if request.method=='GET':
        user = User.objects.filter(Q(UserName=user) | Q(Email=user))
        return JsonResponse({"Exist":len(user)>0})
@csrf_exempt
def GetUsersEmailApi(request):
    if request.method=='POST':
        data=JSONParser().parse(request)
        user = User.objects.filter(id__in=data)
        Serializer=UserEmailSerializer(user,many=True)
        return JsonResponse(Serializer.data,safe=False)

@csrf_exempt
def GetUserApi(request): # Profile Settings
    if request.method=='POST':
        data=JSONParser().parse(request)
        user = User.objects.filter(Q(UserName=data['UserName']) | Q(Email=data['UserName']))
        if len(user)>0:
            if(user[0].range==2):
                user = Worker.objects.filter(Q(UserName=data['UserName']) | Q(Email=data['UserName']))
                Serializer=WorkerPublicSerializer(user,many=True)
                links_profiles = LinksProfile.objects.filter(Worker=user[0].id)
                serializerLinks = LinksProfileSerializer(links_profiles, many=True)
                worker_metrises = workerMaitrise.objects.filter(Worker=user[0].id)
                serializerSkills = WorkerMaitriseSerializerFull(worker_metrises, many=True)
                posts = Post.objects.filter(By_id=user[0].id)
                serializerposts = PostSerializer(posts, many=True)
                return JsonResponse({"found":True,
                                     "User":Serializer.data,
                                     "Links":serializerLinks.data,
                                     "Skills":serializerSkills.data,
                                     "posts":serializerposts.data})
            Serializer=UserPublicSerializer(user,many=True)
            return JsonResponse({"found":True,"User":Serializer.data})
        else : return JsonResponse({"found":False})
@csrf_exempt
def GetUserPrvApi(request): # Profile Settings
    if request.method=='POST':
        data=JSONParser().parse(request)
        user = User.objects.filter(Q(UserName=data['UserName']) | Q(Email=data['UserName']))
        if len(user)>0:
            if(user[0].range==2):
                user = Worker.objects.filter(Q(UserName=data['UserName']) | Q(Email=data['UserName']))
                Serializer=WorkerSerializer(user,many=True)
                links_profiles = LinksProfile.objects.filter(Worker=user[0].id)
                serializerLinks = LinksProfileSerializer(links_profiles, many=True)
                worker_metrises = workerMaitrise.objects.filter(Worker=user[0].id)
                serializerSkills = WorkerMaitriseSerializerFull(worker_metrises, many=True)
                posts = Post.objects.filter(By_id=user[0].id)
                serializerposts = PostSerializer(posts, many=True)
                return JsonResponse({"found":True,
                                     "User":Serializer.data,
                                     "Links":serializerLinks.data,
                                     "Skills":serializerSkills.data,
                                     "posts":serializerposts.data})
            Serializer=UserSerializer(user,many=True)
            return JsonResponse({"found":True,"User":Serializer.data})
        else : return JsonResponse({"found":False})
@csrf_exempt
def GettheseWorkersApi(request):
    if request.method=='POST':
        data=JSONParser().parse(request)
        user = Worker.objects.filter(id__in=data).order_by('-Rating')
        Serializer=WorkerPublicSerializer(user,many=True)
        return JsonResponse(Serializer.data,safe=False)
# Worker 
class WorkerListCreateView(ListCreateAPIView): # get users inf sup add 
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer

    def list(self, request, *args, **kwargs):
        if request.method == 'GET':
            inf = request.query_params.get('inf')
            sup = request.query_params.get('sup')

            if inf is not None and sup is not None:
                workers = Worker.objects.all().order_by('-Rating')[int(inf):int(sup)]
                serializer = WorkerPublicSerializer(workers, many=True)
                return JsonResponse(serializer.data,safe=False)
        
        return super().list(request, *args, **kwargs)

class WorkerRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView): # get 1 update delete
    queryset = Worker.objects.all()
    serializer_class = WorkerSerializer

@csrf_exempt # register worker ---- ---- 
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
def RateWorkerApi(request, rater=0, worker=0, NewRate=0): # profilePro
    if request.method == 'GET':
        RateWorkers = RateWorker.objects.filter(Q(Rater=rater) & Q(Worker=worker))
        serializer = RateWorkerSerializer(RateWorkers, many=True)
        return JsonResponse(serializer.data, safe=False)
    elif request.method == 'POST':
        rater_user = User.objects.get(id=rater)
        worker_user = Worker.objects.get(id=worker)
        RateWorkers, created = RateWorker.objects.get_or_create(Rater=rater_user, Worker=worker_user)
        workerrated = Worker.objects.get(id=worker)
        if created:
            workerrated.Rating = ((workerrated.Rating * workerrated.Nbr_Rating) + NewRate) / (workerrated.Nbr_Rating + 1)
            workerrated.Nbr_Rating += 1
            RateWorkers.Rating = NewRate
            RateWorkers.save()
        else:
            workerrated.Rating = ((workerrated.Rating*workerrated.Nbr_Rating)+NewRate-RateWorkers.Rating)/(workerrated.Nbr_Rating)
            RateWorkers.Rating = NewRate
            RateWorkers.save()
        workerrated.Rating = round(workerrated.Rating, 1)
        workerrated.save()

        new_Rate_serializer = RateWorkerSerializer(RateWorkers)

        return JsonResponse({"new_Rate": new_Rate_serializer.data,"UserRate":workerrated.Rating})

class LinksProfileApi(APIView):
    @csrf_exempt
    def post(self, request, id=0):
        data = JSONParser().parse(request)
        MsgResponse = 'Failed to Add'
        for obj_data in data:
            serializer = LinksProfileSerializer(data=obj_data)
            if serializer.is_valid():
                serializer.save()
                MsgResponse = "Added Successfully"
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': MsgResponse}, status=status.HTTP_201_CREATED)
    @csrf_exempt
    def put(self, request, id=0):
        data = JSONParser().parse(request)
        MsgResponse = 'Failed to Update'
        links_profile = LinksProfile.objects.get(id=data['id'])
        for obj_data in data:
            serializer = LinksProfileSerializer(links_profile, data=obj_data)
            if serializer.is_valid():
                serializer.save()
                MsgResponse = "Updated Successfully"
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': MsgResponse}, status=status.HTTP_200_OK)
    @csrf_exempt
    def delete(self, request, id=0):
        data = JSONParser().parse(request)
        for obj_data in data:
            links_profile = LinksProfile.objects.get(id=obj_data)
            links_profile.delete()
        return JsonResponse("Deleted Successfully", safe=False)

class WorkerMetriseApi(APIView):
    @csrf_exempt
    def post(self, request, id=0):
        data = JSONParser().parse(request)
        MsgResponse = 'Failed to Add'
        for obj_data in data:
            serializer = WorkerMaitriseSerializer(data=obj_data)
            if serializer.is_valid():
                serializer.save()
                MsgResponse = "Added Successfully"
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': MsgResponse}, status=status.HTTP_201_CREATED)
    @csrf_exempt
    def put(self, request, id=0):
        data = JSONParser().parse(request)
        MsgResponse = 'Failed to Update'
        worker_metrise = workerMaitrise.objects.get(id=data['id'])
        for obj_data in data:
            serializer = WorkerMaitriseSerializer(worker_metrise, data=obj_data)
            if serializer.is_valid():
                serializer.save()
                MsgResponse = "Updated Successfully"
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': MsgResponse}, status=status.HTTP_200_OK)
    @csrf_exempt
    def delete(self, request, id=0):
        data = JSONParser().parse(request)
        for obj_data in data:
            worker_metrise = workerMaitrise.objects.get(id=obj_data)
            worker_metrise.delete()
        return JsonResponse("Deleted Successfully", safe=False)

class SkillApi(ListAPIView): # all skills
    queryset = Skill.objects.all()
    serializer_class = SkillSerializer

@csrf_exempt
def SearchApi(request,id=0): # User Search for
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
  
#Job & workers
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
class PostListCreateView(ListCreateAPIView):
    queryset = Post.objects.all().order_by('-Rating', '-date')
    serializer_class = PostSerializer

class PostRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer

@csrf_exempt
def GETPostApi(request, id=0):
    if request.method == 'GET':
        try:
            post = Post.objects.get(id=id)
            serializer = PostSerializerPlus(post)
            similar_posts = get_similar_posts(post)
            serializer_similar_posts = PostSerializerMoin(similar_posts, many=True)

            Images = Image.objects.filter(Post=id)
            serializerImages = ImageSerializer(Images, many=True)
            Links = LinksPost.objects.filter(Post=id)
            serializerLinks = LinksPostSerializer(Links, many=True)
            History = HistoryPost.objects.filter(Post=id,Rating__gt=0)
            rating_counts = [0, 0, 0, 0, 0]
            for i in range(1, 6):
                count = History.filter(Rating=i).count()
                rating_counts[i-1] = count
            reviews = HistoryPost.objects.filter(Post=id,Rating__gt=0).exclude(Content='').order_by('-date')[:5]
            serializerreviews = HistoryPostSerializerPlus(reviews, many=True)
            tags = Tags.objects.filter(Post=id)
            serializerTags = TagsSerializerPlus(tags, many=True)
            offer = offers.objects.filter(Post=id)
            serializeroffers = offersSerializer(offer, many=True)
            return JsonResponse({"data": serializer.data,
                                 "Images":serializerImages.data,
                                 "LinksPost":serializerLinks.data,
                                 "rating_counts":rating_counts,
                                 "reviews":serializerreviews.data,
                                 "Tags":serializerTags.data,
                                 "offers":serializeroffers.data,
                                 "similar_posts": serializer_similar_posts.data,  # Include similar posts
                                 "found": True})
        except ObjectDoesNotExist:
            return JsonResponse({"found": False, "message": "Post not found"})
    if request.method == 'POST':
        data = JSONParser().parse(request)
        posts_required = Post.objects.all().order_by('-Rating', '-date')
        search = data.get('search', '')
        CtegorieList = data.get('CtegorieList', [])
        TypeList = data.get('TypeList', [])
        SepecialList = data.get('SepecialList', [])
        page_number = data.get('Page', 1)

        if search:
            posts_required = posts_required.filter(
                Q(Title__icontains=search) |
                Q(Description__icontains=search) |
                Q(Type__icontains=search) |
                Q(Categorie__icontains=search) |
                Q(Special__icontains=search)
            )
        if CtegorieList:
            categorie_filters = Q()
            for category in CtegorieList:
                categorie_filters |= Q(Categorie__icontains=category.strip())
            posts_required = posts_required.filter(categorie_filters)

        if TypeList:
            type_filters = Q()
            for post_type in TypeList:
                type_filters |= Q(Type__icontains=post_type.strip())
            posts_required = posts_required.filter(type_filters)
        if SepecialList:
            Special_filters = Q()
            for post_Special in SepecialList:
                Special_filters |= Q(Special__icontains=post_Special.strip())
            posts_required = posts_required.filter(Special_filters)

        posts_per_page = 9
        paginator = Paginator(posts_required, posts_per_page)
        try:
            page_number = int(page_number)
        except ValueError:
            page_number = 1

        page_posts = paginator.get_page(page_number)
        serializer = PostSerializerMoin(page_posts, many=True)

        return JsonResponse({
            'page_number': page_posts.number,
            'total_pages': paginator.num_pages,
            'posts': serializer.data
        })   

def get_similar_posts(post):
    similar_posts = Post.objects.filter(
        Q(Categorie__icontains=post.Categorie) | 
        Q(Type__icontains=post.Type)  
    ).exclude(id=post.id).order_by('-Rating')[:5] 
    return similar_posts
@csrf_exempt
def Incrworkerpost(request,id):
    worker = Worker.objects.get(id=id)
    worker.Nbr_Post += 1
    worker.save()
    return JsonResponse('updated', safe=False)
@csrf_exempt
def ProfilePostApi(request, id=0):
    if request.method == 'GET':
        posts = Post.objects.filter(id=id)
        serializer = PostSerializer(posts, many=True)
        return JsonResponse(serializer.data, safe=False)

@csrf_exempt
def HistPostApi(request): # Post
    if request.method == 'POST':
        data = JSONParser().parse(request)

        rater_user = User.objects.get(id=data['User'])
        post = Post.objects.get(id=data['Post'])
        Save = data['Save']
        Rating = data['Rate']
        Content = data['Content']
        date = data['date']
        HistPost, created = HistoryPost.objects.get_or_create(User=rater_user, Post=post)
        if created:
            HistPost.Save = False
            HistPost.Rating=0
            if Save == 1:
                HistPost.Save = True
            if Rating !=0:
                post.Rating = ((post.Rating * post.Nbr_Rating) + Rating) / (post.Nbr_Rating + 1)
                post.Nbr_Rating += 1
                HistPost.Content = Content
                HistPost.Rating = Rating
                HistPost.date = date
        else:
            if Save == 1:
                HistPost.Save = (not HistPost.Save)
            if Rating !=0:
                if HistPost.Rating==0:
                    print((post))
                    print(( Rating))
                    print((post.Nbr_Rating + 1))
                    post.Rating = ((post.Rating * post.Nbr_Rating) + Rating) / (post.Nbr_Rating + 1)
                    post.Nbr_Rating += 1
                else:
                    print((post.Rating*post.Nbr_Rating))
                    print(Rating-HistPost.Rating)
                    print((post.Nbr_Rating))
                    post.Rating = ((post.Rating*post.Nbr_Rating)+Rating-HistPost.Rating)/(post.Nbr_Rating)
                HistPost.Content = Content
                HistPost.Rating = Rating
                HistPost.date = date
        HistPost.save()
        post.Rating = round(post.Rating, 1)
        post.save()
        serializerHistPost = HistoryPostSerializerPlus(HistPost)
        serializerPost = PostSerializerPlus(post)

        rating_counts = [0, 0, 0, 0, 0]
        reviews = []
        offer = offers.objects.filter(Post = data['Post'])
        User_offer = User_Offer.objects.filter(offers__in=offer,User = data['User'])
        serializerUser_offer = User_OfferSerializer(User_offer, many=True)
        if Rating !=0:
            History = HistoryPost.objects.filter(Post=data['Post'],Rating__gt=0)
            for i in range(1, 6):
                count = History.filter(Rating=i).count()
                rating_counts[i-1] = count
            reviews = HistoryPost.objects.filter(Post=data['Post'],Rating__gt=0).exclude(Content='').order_by('-date')[:5]
            serializerreviews = HistoryPostSerializerPlus(reviews, many=True)
            reviews = serializerreviews.data

        return JsonResponse({"UserRate":serializerHistPost.data,
                             "User_offer":serializerUser_offer.data,
                             "post":serializerPost.data,
                             "rating_counts":rating_counts,
                             "reviews":reviews,})

class LinksPostApi(APIView):
    @csrf_exempt
    def post(self, request, id=0):
        data = JSONParser().parse(request)
        MsgResponse = 'Failed to Add'
        for obj_data in data:
            serializer = LinksPostSerializer(data=obj_data)
            if serializer.is_valid():
                serializer.save()
                MsgResponse = "Added Successfully"
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': MsgResponse}, status=status.HTTP_201_CREATED)
    @csrf_exempt
    def put(self, request, id=0):
        data = JSONParser().parse(request)
        MsgResponse = 'Failed to Update'
        links_profile = LinksPost.objects.get(id=data['id'])
        for obj_data in data:
            serializer = LinksPostSerializer(links_profile, data=obj_data)
            if serializer.is_valid():
                serializer.save()
                MsgResponse = "Updated Successfully"
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': MsgResponse}, status=status.HTTP_200_OK)
    @csrf_exempt
    def delete(self, request, id=0):
        data = JSONParser().parse(request)
        for obj_data in data:
            links_profile = LinksPost.objects.get(id=obj_data)
            links_profile.delete()
        return JsonResponse("Deleted Successfully", safe=False)
class TagsApi(APIView):
    @csrf_exempt
    def post(self, request, id=0):
        data = JSONParser().parse(request)
        MsgResponse = 'Failed to Add'
        for obj_data in data:
            user = User.objects.filter(Q(UserName=obj_data['User']))
            if len(user)>0:
                obj_data['User'] = user[0].id
                serializer = TagsSerializer(data=obj_data)
                if serializer.is_valid():
                    serializer.save()
                    MsgResponse = "Added Successfully"
                else:
                    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': MsgResponse}, status=status.HTTP_201_CREATED)
    @csrf_exempt
    def put(self, request, id=0):
        data = JSONParser().parse(request)
        MsgResponse = 'Failed to Update'
        links_profile = Tags.objects.get(id=data['id'])
        for obj_data in data:
            serializer = TagsSerializer(links_profile, data=obj_data)
            if serializer.is_valid():
                serializer.save()
                MsgResponse = "Updated Successfully"
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        return Response({'message': MsgResponse}, status=status.HTTP_200_OK)
    @csrf_exempt
    def delete(self, request, id=0):
        data = JSONParser().parse(request)
        for obj_data in data:
            links_profile = Tags.objects.get(id=obj_data)
            links_profile.delete()
        return JsonResponse("Deleted Successfully", safe=False)

class ImageListCreateView(ListCreateAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer
class ImageRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = Image.objects.all()
    serializer_class = ImageSerializer   

class User_OfferListCreateView(ListCreateAPIView):
    queryset = User_Offer.objects.all()
    serializer_class = User_OfferSerializer
class User_OfferRetrieveUpdateDeleteView(RetrieveUpdateDestroyAPIView):
    queryset = User_Offer.objects.all()
    serializer_class = User_OfferSerializer   

@csrf_exempt
def AllreviewsPostApi(request, id=0,All=1):
    if request.method == 'GET':
        try:
            if All ==1:
                reviews = HistoryPost.objects.filter(Post=id,Rating__gt=0).exclude(Content='')
            else:
                reviews = HistoryPost.objects.filter(Post=id,Rating__gt=0).exclude(Content='')
            serializerreviews = HistoryPostSerializerPlus(reviews, many=True)
            return JsonResponse({"reviews":serializerreviews.data,"found":True})
        except ObjectDoesNotExist:
            return JsonResponse({"found": False, "message": "Post not found"})
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
    