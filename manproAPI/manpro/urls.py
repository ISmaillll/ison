from django.urls import path
from .views  import * 

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    #User
    path('Api/User/', UserListCreateView.as_view(), name='user-list-create'),
    path('Api/User/<int:pk>/', UserRetrieveUpdateDeleteView.as_view(), name='user-retrieve-update-delete'),
    path('Api/UserVrefie',VRUserApi),
    path('Api/UserExist/<str:user>/',ExistUserApi),
    path('Api/UserGet',GetUserApi),
    path('Api/UserGetprv',GetUserPrvApi),
    path('Api/UserMailGet',GetUsersEmailApi),
    path('Api/UserToWorker/<int:id>',UserToWorker),
    #Worker
    path('Api/Worker/', WorkerListCreateView.as_view(), name='worker-list-create'),
    path('Api/Worker/<int:pk>/', WorkerRetrieveUpdateDeleteView.as_view(), name='worker-retrieve-update-delete'),

    path('Api/LinksProfile', LinksProfileApi.as_view()),
    path('Api/LinksProfile/<int:id>', LinksProfileApi.as_view()),

    path('Api/WorkerMaitrise', WorkerMetriseApi.as_view()),
    path('Api/WorkerMaitrise/<int:id>', WorkerMetriseApi.as_view()),

    path('Api/Apply_For', ApplyForApi),
    path('Api/Apply_For/<int:Wid>/<int:Jid>', ApplyForApi),
    path('Api/WApply_For/<int:id>', WorkerApplyForApi),
    path('Api/JApply_For', JobApplyersApi),
    
    path('Api/WorkerRateUser/<int:rater>/<int:worker>/<int:NewRate>', RateWorkerApi),
    path('Api/WorkerRateUser/<int:rater>/<int:worker>', RateWorkerApi),
    path('Api/WorkerRateUser', RateWorkerApi),

    path('Api/GettheseWorker', GettheseWorkersApi),
    path('Api/SearchWorker', SearchWorkersApi),
    path('Api/Search/<int:id>', SearchApi),
    path('Api/Search', SearchApi),
    path('Api/InterestedJobs',InterestedJobsApi),
    path('Api/InterestedJobs/<int:idWorker>/<int:idJob>',InterestedJobsApi),
    path('Api/PreposeJobs',PreposeJobsApi),
    path('Api/PreposeJobs/<int:idWorker>',PreposeJobsApi),
    path('Api/HistJobs/<int:idWorker>',HistJobsApi),
    path('Api/Stat',GETStatApi),

    #Project
    path('Api/Projects', ProjectApi),
    path('Api/Projects/<int:id>', ProjectApi),
    path('Api/ProjectsGET', GETProjectApi),
    path('Api/ProjectsWorkGET/<int:id>', WorkerJobsApi),

    path('Api/Jobs', JobsApi),
    path('Api/Jobs/<int:id>', JobsApi),
    path('Api/JobsGET', GETJobsApi),
    path('Api/JobsProjectGET', GETProjefctJobsApi),
    path('Api/SearchJob', SearchJobsApi),

    path('Api/Skill/', SkillApi.as_view()),
    path('Api/Skill/<int:id>', SkillApi.as_view()),

    path('Api/ProjectRequired', ProjectRequiredApi),
    path('Api/ProjectRequiredGET', GETProjectRequiredApi),
    path('Api/ProjectRequired/<int:id>', ProjectRequiredApi),

    #Post 
    path('Api/Post/', PostListCreateView.as_view()),
    path('Api/PostGET/', GETPostApi),
    path('Api/PostGET/<int:id>', GETPostApi),
    path('Api/Post/<int:id>', PostRetrieveUpdateDeleteView.as_view()),
    path('Api/PostProfile/<int:id>', ProfilePostApi),
    path('Api/Incrworkerpost/<int:id>', Incrworkerpost),

    path('Api/HistPostApi/', HistPostApi),
    path('Api/Allreviews/<int:id>/<int:All>', AllreviewsPostApi),

    path('Api/LinksPost', LinksPostApi.as_view()),
    path('Api/LinksPost/<int:id>', LinksPostApi.as_view()),
    
    path('Api/Tags', TagsApi.as_view()),
    path('Api/Tags/<int:id>', TagsApi.as_view()),

    path('Api/Image/', ImageListCreateView.as_view()),
    path('Api/Image/<int:id>', ImageRetrieveUpdateDeleteView.as_view()),

    path('Api/User_Offer/', User_OfferListCreateView.as_view()),
    path('Api/User_Offer/<int:id>', User_OfferRetrieveUpdateDeleteView.as_view()),
    #Chat
    path('Api/Conversation', conversation_api),
    path('Api/Conversation/<int:id>', conversation_api),

    path('Api/Messages', message_api),
    path('Api/Messages/<int:id>', message_api),

    #Notifications
    path('Api/Notification', notification_api),
    path('Api/Notification/<int:id>', notification_api),


    path('Api/NotifUser', NotifUserApi),
    path('Api/NotifUser/<int:id>', NotifUserApi),

    #RecSys
    path('Api/SaveCsv',ExportDAtaCsv),
    path('Api/PredictWorkers/<str:Profession>/', predictWorkers),
    path('Api/PredictJobs/<str:Profession>/', predictJobs)

]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)