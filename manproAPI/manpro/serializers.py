from rest_framework import serializers
from .models import *

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = "__all__"
class UserPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id','Name','Lastname','Email','ProfilePhoto','range', 'UserName']

class UserEmailSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id','UserName','Email')

class WorkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields = "__all__"

class WorkerPublicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields = ['id','Name','Lastname','Email','ProfilePhoto','range', 'UserName', 'Profession', 'Education_Level', 'Bio', 'Nbr_Rating', 'Rating', 'Nbr_Post']

class WorkerRecSerializer(serializers.ModelSerializer):
    class Meta:
        model = Worker
        fields = ('id','Profession','Rating','Nbr_Rating')

class LinksProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = LinksProfile
        fields = "__all__"

class ApplyForSerializer(serializers.ModelSerializer):
    class Meta:
        model = Apply_For
        fields = "__all__"
class ApplyersSerializer(serializers.ModelSerializer):
    Worker = WorkerPublicSerializer()
    class Meta:
        model = Apply_For
        fields = "__all__"

class SkillSerializer(serializers.ModelSerializer):
    class Meta:
        model = Skill
        fields = "__all__"

class WorkerMaitriseSerializerFull(serializers.ModelSerializer):
    Skill = SkillSerializer()
    class Meta:
        model = workerMaitrise
        fields = "__all__"

class WorkerMaitriseSerializer(serializers.ModelSerializer):
    class Meta:
        model = workerMaitrise
        fields = "__all__"

class SearchSerializer(serializers.ModelSerializer):
    class Meta:
        model = Search
        fields = "__all__"

class InterestedJobsSerializer(serializers.ModelSerializer):
    class Meta:
        model = InterestedJobs
        fields = "__all__"

class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"

class ManagerSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'UserName', 'ProfilePhoto')
 
class RateWorkerSerializer(serializers.ModelSerializer):
    class Meta:
        model = RateWorker
        fields = "__all__"

class ProjectManagerSerializer(serializers.ModelSerializer):
    Manager = ManagerSerializer()
    class Meta:
        model = Project
        fields = "__all__"

class JobsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jobs
        fields = "__all__"

class ProjectRequiredSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProjectRequired
        fields = "__all__"

class ProjectRequiredSerializerFull(serializers.ModelSerializer):
    Skill = SkillSerializer()
    class Meta:
        model = ProjectRequired
        fields = "__all__"

class PostSerializer(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = "__all__"

class PostSerializerMoin(serializers.ModelSerializer):
    class Meta:
        model = Post
        fields = ('id','Title','Logo','Type','Categorie','Rating')

class PostSerializerPlus(serializers.ModelSerializer):
    By = WorkerPublicSerializer()
    class Meta:
        model = Post
        fields = "__all__"

class LinksPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = LinksPost
        fields = "__all__"

class TagsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tags
        fields = "__all__"

class TagsSerializerPlus(serializers.ModelSerializer):
    User = UserPublicSerializer()
    class Meta:
        model = Tags
        fields = "__all__"

class ImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = Image
        fields = "__all__"
        
class HistoryPostSerializer(serializers.ModelSerializer):
    class Meta:
        model = HistoryPost
        fields = "__all__"

class User_OfferSerializer(serializers.ModelSerializer):
    class Meta:
        model = User_Offer
        fields = "__all__"

class HistoryPostSerializerPlus(serializers.ModelSerializer):
    User = UserPublicSerializer()
    class Meta:
        model = HistoryPost
        fields = "__all__"

class offersSerializer(serializers.ModelSerializer):
    class Meta:
        model = offers
        fields = "__all__"

class ConversationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Conversation
        fields = "__all__"


class MessagesSerializer(serializers.ModelSerializer):
    class Meta:
        model = Messages
        fields = "__all__"


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = "__all__"


class NotifUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = NotifUser
        fields = "__all__"
        
class NotificationBySerializer(serializers.ModelSerializer):
    By = ManagerSerializer()
    class Meta:
        model = Notification
        fields = "__all__"

class NotifUserPlusSerializer(serializers.ModelSerializer):
    Notif = NotificationBySerializer()
    class Meta:
        model = NotifUser
        fields = "__all__"