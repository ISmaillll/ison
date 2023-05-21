from django.db import models

# User
class User (models.Model):

    UserName = models.CharField(max_length=50,unique=True)
    Name = models.CharField(max_length=50)
    Lastname = models.CharField(max_length=50)
    Email = models.CharField(max_length=100,unique=True)
    PassWord = models.CharField(max_length=100)
    ProfilePhoto = models.CharField(max_length=50,default="anonymous.png")
    CartHolder = models.CharField(max_length=100,null=True)
    Criditcart =  models.IntegerField(null=True)
    cardYear = models.CharField(null=True,max_length=4)
    cardMonth = models.CharField(null=True,max_length=2)
    CVV =   models.IntegerField(null=True)
    Is_Worker = models.BooleanField(default=False)

class Search(models.Model):

    content = models.CharField(max_length=250)
    Time = models.DateTimeField(null=True)
    user = models.ForeignKey("User",on_delete=models.CASCADE)
    count = models.IntegerField(default=1)

class InterestedJobs(models.Model):

    Worker = models.ForeignKey("Worker",on_delete=models.CASCADE)
    Job = models.ForeignKey("Jobs",on_delete=models.CASCADE)
    Viewcount = models.IntegerField(default=1)
    Time = models.DateTimeField(null=True)
    Save = models.BooleanField(default=False)
    Is_saved = models.BooleanField(default=False)
    Apply = models.BooleanField(default=False)

class Worker (User):

    Profession = models.CharField(max_length=50)
    Education_Level = models.CharField(max_length=50)
    Bio = models.CharField(max_length=201,default='')
    Nbr_Rating = models.IntegerField()
    Rating = models.FloatField()
    Nbr_Post = models.IntegerField(default=0)
    Avalble = models.BooleanField(default=True)

class LinksProfile (models.Model):

    To = models.CharField(max_length=50)
    URL = models.CharField(max_length=150)
    Worker = models.ForeignKey("Worker",on_delete=models.CASCADE)

class workerMaitrise (models.Model):

    Skill_Rating = models.IntegerField()
    Skill = models.ForeignKey("Skill",on_delete=models.CASCADE)
    Worker = models.ForeignKey("Worker",on_delete=models.CASCADE)

class Apply_For (models.Model):
    
    Worker = models.ForeignKey("Worker",on_delete=models.CASCADE,default=0)
    Job = models.ForeignKey("Jobs",on_delete=models.CASCADE,default=0)
    Date_Apply = models.DateTimeField()
    Date_Work = models.DateTimeField(null=True)
    State = models.BooleanField(default=False)

    
class Skill (models.Model):

    skill = models.CharField(max_length=50)

class RateWorker (models.Model):

    Rater = models.ForeignKey("User",on_delete=models.CASCADE,related_name="Rater")
    Worker = models.ForeignKey("Worker",on_delete=models.CASCADE,related_name="Worker")
    Rating = models.IntegerField()

# PROJECT
class Project (models.Model):
    
    Name = models.CharField(max_length=50,default='')
    Type = models.CharField(max_length=50)
    State = models.CharField(max_length=50,default='_')
    Date = models.DateTimeField(null=True)
    Date_Start = models.DateTimeField(null=True)
    Duration = models.DateTimeField(null=True)
    Budget = models.CharField(max_length=150,default="0")
    LinkF = models.CharField(max_length=150,default='\\')
    LinkChat = models.CharField(max_length=150,default='\\')
    Description = models.CharField(max_length=500)
    Manager = models.ForeignKey("User",on_delete=models.SET_NULL,null=True)

class Jobs (models.Model):

    Job = models.CharField(max_length=50)
    State = models.CharField(max_length=50,default='_')
    Description = models.CharField(max_length=300,default='_')
    Date = models.DateTimeField(default='2000-01-01')
    Payment = models.CharField(max_length=50)
    Project = models.ForeignKey("Project",on_delete=models.CASCADE)

class ProjectRequired (models.Model):

    Skill_Rating = models.IntegerField()
    Skill = models.ForeignKey("Skill",on_delete=models.CASCADE)
    Job = models.ForeignKey("Jobs",on_delete=models.CASCADE)

#  POST
class Post (models.Model):

    Title = models.CharField(max_length=100)
    Description = models.CharField(max_length=1000)
    Tags = models.CharField(max_length=200)
    Nbr_Rating = models.IntegerField()
    Rating = models.FloatField()
    By = models.ForeignKey("Worker",on_delete=models.CASCADE)

class LinksPost (models.Model):

    To = models.CharField(max_length=50)
    URL = models.CharField(max_length=150)
    Post = models.ForeignKey("Post",on_delete=models.CASCADE)

class Image (models.Model):

    URL = models.CharField(max_length=150)
    Post = models.ForeignKey("Post",on_delete=models.CASCADE)

class Comments (models.Model):

    Content = models.CharField(max_length=200)
    User = models.ForeignKey("User",on_delete=models.CASCADE)
    Post = models.ForeignKey("Post",on_delete=models.CASCADE)

class HistoryPost (models.Model):

    Rating = models.FloatField()
    User = models.ForeignKey("User",on_delete=models.CASCADE)
    Post = models.ForeignKey("Post",on_delete=models.CASCADE)

# Chat 

class Conversation (models.Model):

    User1 = models.ForeignKey("User",on_delete=models.SET_NULL,null=True,related_name='User1')
    User2 = models.ForeignKey("User",on_delete=models.SET_NULL,null=True,related_name='User2')

class Messages (models.Model):

    Content = models.CharField(max_length=200)
    DateT = models.DateTimeField()
    By = models.ForeignKey("User",on_delete=models.SET_NULL,null=True)
    Conv = models.ForeignKey("Conversation",on_delete=models.CASCADE)


# Notification

class Notification (models.Model):

    Content = models.CharField(max_length=150)
    Link = models.CharField(max_length=150,default='-')
    Date = models.DateTimeField()
    Type = models.CharField(max_length=30)
    By =  models.ForeignKey("User",on_delete=models.SET_NULL,null=True)

class NotifUser (models.Model):

    UserNot = models.ForeignKey("User",on_delete=models.CASCADE)
    Notif = models.ForeignKey("Notification",on_delete=models.CASCADE)
    Is_read = models.BooleanField()
