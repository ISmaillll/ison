from django.db import models

# User
class User (models.Model):

    UserName = models.CharField(max_length=50,unique=True)
    Name = models.CharField(max_length=50)
    Lastname = models.CharField(max_length=50)
    Email = models.CharField(max_length=100,unique=True)
    PassWord = models.CharField(max_length=100)
    ProfilePhoto = models.ImageField(default="anonymous.png",null=True)
    CartHolder = models.CharField(max_length=100,null=True,blank=True)
    Criditcart =  models.IntegerField(null=True,blank=True)
    cardYear = models.CharField(null=True,max_length=4,blank=True)
    cardMonth = models.CharField(null=True,max_length=4,blank=True)
    CVV =   models.IntegerField(null=True,blank=True)
    range = models.IntegerField(default=1)

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
    Rating = models.IntegerField(default=0,null=True)

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
    Logo = models.ImageField(null=True)
    Description = models.CharField(max_length=1000)
    Type = models.CharField(max_length=200,default=" ")
    Categorie = models.CharField(max_length=200,default=" ")
    Special = models.CharField(max_length=200,default=" ")
    Nbr_Rating = models.IntegerField()
    Rating = models.FloatField()
    By = models.ForeignKey("Worker",on_delete=models.CASCADE)
    date = models.DateTimeField(null=True,blank=True)
    Prix = models.CharField(max_length=50,blank=True,null=True)
    Version = models.CharField(max_length=20,blank=True,default="1")
    DateRelease = models.DateField(null=True,blank=True)
    DateUpdate = models.DateField(null=True,blank=True)
    TeamName = models.CharField(max_length=100,blank=True)
    Finiched = models.BooleanField(default=True)
    Forseal = models.BooleanField(default=False)
    AgeAuto = models.CharField(max_length=30,default='+3',blank=True)

class LinksPost (models.Model):

    To = models.CharField(max_length=50)
    URL = models.CharField(max_length=150)
    Post = models.ForeignKey("Post",on_delete=models.CASCADE)

class Image (models.Model):

    URL = models.ImageField()
    Post = models.ForeignKey("Post",on_delete=models.CASCADE)

class HistoryPost (models.Model):

    Rating = models.FloatField(default=0)
    Save = models.BooleanField(default=0)
    Content = models.CharField(max_length=500,blank=True,default="")
    date = models.DateTimeField(null=True)
    User = models.ForeignKey("User",on_delete=models.CASCADE)
    Post = models.ForeignKey("Post",on_delete=models.CASCADE)

class Tags (models.Model):

    User = models.ForeignKey("User",on_delete=models.CASCADE)
    Post = models.ForeignKey("Post",on_delete=models.CASCADE)

class offers (models.Model):

    contenu = models.CharField(max_length=500)
    PlusCnt = models.CharField(max_length=100,blank=True)
    Email = models.CharField(max_length=200,blank=True)
    Contact = models.CharField(max_length=200,blank=True)
    Prix = models.CharField(max_length=100,blank=True)
    Post = models.ForeignKey("Post",on_delete=models.CASCADE)

class User_Offer (models.Model):

    Message = models.CharField(max_length=500,blank=True)
    Num_Tel = models.CharField(max_length=20,blank=True)
    State = models.CharField(max_length=20)
    date = models.DateTimeField()
    offers = models.ForeignKey("offers",on_delete=models.CASCADE)
    User = models.ForeignKey("User",on_delete=models.CASCADE)

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
