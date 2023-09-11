from django.db import models
# from django.utils import timezone

class GlobalSettings(models.Model):
    SiteName = models.CharField(max_length=100)
    SiteContact = models.CharField(max_length=100)
    SiteEmail = models.EmailField()
    SiteAddress = models.CharField(max_length=500)
    Sitedescription = models.CharField(max_length=500)
    Sitelicence = models.CharField(max_length=300)
    SiteRegister = models.CharField(max_length=100,null=True)
    Sitetwitterlink = models.CharField(max_length=300)
    Sitefacebooklink = models.CharField(max_length=300)
    Sitelinkdinlink = models.CharField(max_length=300)
    Siteinstagram = models.CharField(max_length=300)
    Siteyoutubelink = models.CharField(max_length=300)
    logo = models.ImageField(upload_to="Global/",max_length=200, null=True, default=None)
    back_image = models.ImageField(upload_to="Global/",null=True)
    brochure = models.FileField(upload_to="brochure/",null=True)
    broc_name =models.CharField(max_length=100,null=True)

    def __str__(self):
        return self.SiteName

class ContactUS(models.Model):
    name = models.CharField(max_length=50)
    email = models.CharField(max_length=50)
    subject = models.CharField(max_length=50)
    message = models.TextField()
    mobile = models.CharField(max_length=50,null=True)


    def __str__(self):
        return self.name
      

class Navigation(models.Model):
    PAGE_TYPE = (
        ('Home', 'Home'), ('Slider','Slider'),
        ('About/company', 'About/company'), ('About/legal doc', 'About/legal doc'), ('gallery/doc', 'gallery/doc'),
        ('who we are','who we are'),('what we offer','what we offer'),('what we do','what we do'),
        ('clients','clients'),('About/Who we are', 'About/Who we are'),('company profile', 'company profile'),('Message from Chairman','Message from Chairman'),
        ('objective','objective'),('organization chart','organization chart'),('legal documents','legal documents'), ('Gallery', 'Gallery'),('Mission & Vision','Mission & Vision'),
        ('company/Director Profile','comapny/Director Profile'),('Recruitment Process','Recruitment Process'),('Client-Candidate Matching','Client-Candidate Matching'),('Required Documents','Required Documents'),('Service/Required Documents','Service/Required Documents'),
        ('Industry Expertise','Industry Expertise'),('Job Category','Job Category'),('Unskilled','Unskilled'),('skilled','skilled'),('semi-skilled','semi-skilled'),('Highly-skilled','Highly-skilled'),
        ('Unskilled/job','Unskilled/job'),('skilled/job','skilled/job'),('semi-skilled/job','semi-skilled/job'),('Highly-skilled/job','Highly-skilled/job'),('contact us','contact us'),('Vacancy','Vacancy'),('New Vacancy','New Vacancy'),
        ('Newspaper Vacancy','Newspaper Vacancy'),('New/Newspaper Vacancy','New/Newspaper Vacancy')

       
    )

    STATUS = (
        ('Publish', 'Publish'),
        ('Draft', 'Draft')
    )
    name = models.CharField(max_length=100, null=False)
    caption = models.CharField(max_length=100)
    status = models.CharField(choices=STATUS, max_length=50)
    position = models.IntegerField()
    page_type = models.CharField(choices=PAGE_TYPE, null=True, blank=True, max_length=50)
    title = models.CharField(max_length=200)
    short_desc = models.TextField(null=True)
    desc = models.TextField(null=True)
    bannerimage = models.ImageField(upload_to="about/",null=True)
    meta_title = models.CharField(max_length=100, null=True)
    meta_keyword = models.CharField(max_length=100, null=True)
    icon_image = models.TextField(null=True)
    slider_image = models.ImageField(upload_to="about/", null=True)
    Parent = models.ForeignKey('self', related_name="childs", on_delete=models.CASCADE, null=True, blank=True)
    brochure = models.FileField(upload_to="brochure/",null=True)
    back_image = models.ImageField(upload_to="background/",null=True)
    

    def __str__(self):
        return self.name


