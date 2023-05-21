from django.urls import path
from .views  import * 

from django.conf.urls.static import static
from django.conf import settings

urlpatterns=[
    #User
    path('User',UserApi),
    path('UserVrefie',VRUserApi),
    path('UserGet',GetUserApi),
    path('UserMailGet',GetUsersEmailApi),
    path('User/<int:id>',UserApi),
    path('UserToWorker/<int:id>',UserToWorker),

    path('Worker',WorkerApi),
    path('Worker/<int:inf>/<int:sup>',WorkerApi),
    path('WorkerGet',GetWorkerApi),
    path('WorkerGetprv',GetWorkerPrvApi),
    path('Worker/<int:id>',WorkerApi),

    path('LinksProfile', LinksProfileApi),
    path('LinksProfile/<int:id>', LinksProfileApi),

    path('WorkerMaitrise', WorkerMetriseApi),
    path('WorkerMaitrise/<int:id>', WorkerMetriseApi),

    path('Apply_For', ApplyForApi),
    path('Apply_For/<int:Wid>/<int:Jid>', ApplyForApi),
    path('WApply_For/<int:id>', WorkerApplyForApi),
    path('JApply_For', JobApplyersApi),

    path('WorkerRateUser/<int:rater>/<int:Worker>', RateWorkerApi),
    path('WorkerRateUser', RateWorkerApi),

    path('GettheseWorker', GettheseWorkersApi),
    path('SearchWorker', SearchWorkersApi),
    path('Search/<int:id>', SearchApi),
    path('Search', SearchApi),
    path('InterestedJobs',InterestedJobsApi),
    path('InterestedJobs/<int:idWorker>/<int:idJob>',InterestedJobsApi),
    path('PreposeJobs',PreposeJobsApi),
    path('PreposeJobs/<int:idWorker>',PreposeJobsApi),
    path('HistJobs/<int:idWorker>',HistJobsApi),
    path('Stat',GETStatApi),

    #Project
    path('Projects', ProjectApi),
    path('Projects/<int:id>', ProjectApi),
    path('ProjectsGET', GETProjectApi),
    path('ProjectsWorkGET/<int:id>', WorkerJobsApi),

    path('Jobs', JobsApi),
    path('Jobs/<int:id>', JobsApi),
    path('JobsGET', GETJobsApi),
    path('JobsProjectGET', GETProjefctJobsApi),
    path('SearchJob', SearchJobsApi),

    path('Skill', SkillApi),
    path('Skill/<int:id>', SkillApi),

    path('ProjectRequired', ProjectRequiredApi),
    path('ProjectRequiredGET', GETProjectRequiredApi),
    path('ProjectRequired/<int:id>', ProjectRequiredApi),

    #Post
    path('Post', PostApi),
    path('Post/<int:id>', PostApi),
    path('PostProfile/<int:id>', ProfilePostApi),

    path('LinksPost', LinksPostApi),
    path('LinksPost/<int:id>', LinksPostApi),

    path('Image', ImageApi),
    path('Image/<int:id>', ImageApi),

    path('Comments', CommentApi),
    path('Comments/<int:id>', CommentApi),

    path('HistoryPost', HistoryPostApi),
    path('HistoryPost/<int:id>', HistoryPostApi),

    #Chat
    path('Conversation', conversation_api),
    path('Conversation/<int:id>', conversation_api),

    path('Messages', message_api),
    path('Messages/<int:id>', message_api),

    #Notifications
    path('Notification', notification_api),
    path('Notification/<int:id>', notification_api),


    path('NotifUser', NotifUserApi),
    path('NotifUser/<int:id>', NotifUserApi),

    #files
    path('savefile',SaveFile),
    path('deletefile/<str:file_name>/', delete_file),

    #RecSys
    path('SaveCsv',ExportDAtaCsv),
    path('PredictWorkers/<str:Profession>/', predictWorkers),
    path('PredictJobs/<str:Profession>/', predictJobs)

]+static(settings.MEDIA_URL,document_root=settings.MEDIA_ROOT)