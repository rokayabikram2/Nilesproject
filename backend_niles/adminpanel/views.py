from django.shortcuts import render,redirect, get_object_or_404
from django.http import HttpResponseRedirect, HttpResponse
from django.contrib.auth.models import User
from django.contrib import messages
from django.contrib.auth import authenticate, login, logout
from .models import GlobalSettings, ContactUS, Navigation
from django.contrib.auth.decorators import login_required
from django.conf import settings


from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import GlobalSettings , Navigation
from .serializers import GlobalSettingsSerializer ,NavigationSerializer







def admin_login(request):
    glob = GlobalSettings.objects.all()
    try:
        # messages.info(request, 'Account not found')
        if request.method == 'POST':
            username = request.POST.get("username")
            password = request.POST.get("password")         
            user_obj = User.objects.filter(username = username)
            
            if not user_obj.exists():
                messages.info(request, "Account not found")
                return HttpResponseRedirect(request.META.get("HTTP_REFERER"))
            print(username, password)
            user_obj = authenticate(username = username, password = password)

            if user_obj and user_obj.is_superuser:
                login(request, user_obj)
                return redirect("dashboard")
          
            messages.info(request, "Invalid password")
            return redirect('/')
                    
        return render(request, "login.html", {'glob':glob})
       
    except Exception as e:
        print(e)
        # Add a proper response in case of an exception
        return HttpResponse("An error occurred")

@login_required(login_url=settings.LOGIN_URL)
def dashboard(request):
    glob = GlobalSettings.objects.all()

    return render(request, "dashboard.html", {'glob':glob})

def Logoutpage(request):
    logout(request)
    return redirect("admin_login")

@login_required(login_url=settings.LOGIN_URL)
def globalsetting(request):
    glob = GlobalSettings.objects.all()
    try:
        data = GlobalSettings.objects.first()
    except GlobalSettings.DoesNotExist:
        data = None

    if request.method == "POST":
        name = request.POST.get('name')
        contact = request.POST.get('contact')
        address = request.POST.get('address')
        email = request.POST.get('email')
        description = request.POST.get('description')
        licence = request.POST.get('licence')
        register_no = request.POST.get('register_no')
        twitterlink = request.POST.get('twitterlink')
        facebooklink = request.POST.get('facebooklink')
        linkdinlink = request.POST.get('linkdinlink')
        instagram = request.POST.get('instagram')
        youtubelink = request.POST.get('youtubelink')
        logo = request.FILES.get('logo')
        back_image = request.FILES.get('back_image')
        brochure = request.FILES.get('brochure')
        broc_name = request.POST.get('broc_name')

        if data is None:
            # Create a new GlobalSettings object
            data = GlobalSettings(SiteName=name, SiteContact=contact, SiteAddress=address, SiteEmail=email,
                                  Sitedescription=description,Sitelicence=licence,Sitetwitterlink=twitterlink,
                                  Sitefacebooklink=facebooklink,Sitelinkdinlink=linkdinlink,Siteinstagram=instagram,
                                  Siteyoutubelink=youtubelink, SiteRegister=register_no,broc_name=broc_name,)
        else:
            # Update existing GlobalSettings object
            data.SiteName = name
            data.SiteContact = contact
            data.SiteAddress = address
            data.SiteEmail = email
            data.Sitedescription = description
            data.Sitelicence = licence
            data.Sitetwitterlink = twitterlink
            data.Sitefacebooklink = facebooklink
            data.Sitelinkdinlink = linkdinlink
            data.Siteinstagram = instagram
            data.Siteyoutubelink = youtubelink
            data.SiteRegister = register_no
            data.broc_name = broc_name

        if logo:
            # Set the uploaded image to the 'logo' field
            data.logo = logo
        if brochure:
            # Set the uploaded image to the 'logo' field
            data.brochure = brochure
        if back_image:
            data.back_image = back_image
        
        data.save()

        return redirect('globalsetting')  # Redirect to the same view after saving the data

    return render(request, "globalsetting.html", {"data": data, 'glob' : glob})

@login_required(login_url=settings.LOGIN_URL)
def contactus(request):
    glob = GlobalSettings.objects.all()
    con=ContactUS.objects.all()
 
    return render(request, "contactus.html",{'con':con, 'glob' : glob})

@login_required(login_url=settings.LOGIN_URL)
def delete_contact(request, pk):
    con = get_object_or_404(ContactUS, pk=pk)

    if request.method == "POST":
        con.delete()
        return redirect('contactus')

    return redirect('contactus')

@login_required(login_url=settings.LOGIN_URL)
def main_navigation(request, parent_id=None):
    glob=GlobalSettings.objects.all()
        
    if parent_id:
        obj = Navigation.objects.filter(Parent=parent_id).order_by('position')
    else:
        obj = Navigation.objects.filter(Parent = None).order_by('position')
 
    return render(request, "main_navigation.html", {'obj':obj, 'parent_id':parent_id,'glob':glob})

@login_required(login_url=settings.LOGIN_URL)
def navigation_list(request, parent_id=None):
    glob = GlobalSettings.objects.all()
    obj = Navigation.objects.all()

    if request.method == "POST":
        # Retrieve form data
        # next = request.POST.get('next','/')
        name = request.POST.get('name')
        caption = request.POST.get('caption')
        status = request.POST.get('status')
        position = request.POST.get('position')
        page_type = request.POST.get('page_type')
        title = request.POST.get('title')
        short_desc = request.POST.get('short_desc')
        bannerimage = request.FILES.get('bannerimage')
        brochure = request.FILES.get('brochure')
        meta_title = request.POST.get('meta_title')
        meta_keyword = request.POST.get('meta_keyword')
        icon_image = request.POST.get('icon_image')
        slider_image = request.FILES.get('slider_image')
        parent_id = request.POST.get('Parent')
        desc = request.POST.get('desc')
        back_image = request.FILES.get('back_image')
        if parent_id:
            parent_navigation = Navigation.objects.get(pk=parent_id)
        else:
            parent_navigation = None

        # Create a new Navigation objectj
        obj = Navigation.objects.create(
            name=name,
            caption=caption,
            status=status,
            position=position,
            page_type=page_type,
            title=title,
            short_desc=short_desc,
            meta_title=meta_title,
            meta_keyword=meta_keyword,
            desc=desc,
            icon_image=icon_image,
            Parent=parent_navigation,  # Assign parent navigation object
        )
        

        # Set uploaded images
        if bannerimage:
            obj.bannerimage = bannerimage
        if slider_image:
            obj.slider_image = slider_image
        if back_image:
            obj.back_image = back_image
        if brochure:
            obj.brochure = brochure

        obj.save()  # Save the new Navigation object to the database

        obj = Navigation.objects.all()  # Update the navigation list with the new object

        if parent_id:
            return redirect('main_navigation', parent_id=parent_id )
        else:
            return redirect('main_navigation')
      

    return render(request, 'navigation.html',{'obj': obj, 'glob' : glob, 'parent_id':parent_id})

@login_required(login_url=settings.LOGIN_URL)
def update(request, pk):
    glob = GlobalSettings.objects.all()
    data = get_object_or_404(Navigation, pk=pk)

    if request.method == "POST":
        name=request.POST.get('name')
        caption=request.POST.get('caption')
        status=request.POST.get('status')
        position=request.POST.get('position')
        page_type=request.POST.get('page_type')
        title=request.POST.get('title')
        short_desc=request.POST.get('short_desc')
        desc=request.POST.get('desc')
        bannerimage=request.FILES.get('bannerimage')
        meta_title=request.POST.get('meta_title')
        meta_keyword=request.POST.get('meta_keyword')
        icon_image=request.POST.get('icon_image')
        slider_image=request.FILES.get('slider_image')
        brochure = request.FILES.get('brochure')
        parent_id = request.POST.get('Parent')
        back_image = request.FILES.get('back_image')

        if parent_id:
            parent_navigation = Navigation.objects.get(pk=parent_id)
        else:
            parent_navigation = None

        
        # Update the object with the form data
        data.name = name
        data.caption = caption
        data.status = status
        data.position = position
        data.page_type = page_type
        data.title = title
        data.short_desc = short_desc
        data.meta_title = meta_title
        data.meta_keyword = meta_keyword
        data.desc = desc
        data.Parent=parent_navigation
        data.icon_image=icon_image
        
        

        if bannerimage:
            data.bannerimage = bannerimage

        if slider_image:
            data.slider_image = slider_image
            
        
        if back_image:
            data.back_image = back_image
        
        if brochure:
            data.brochure = brochure
        
        data.save()

        if parent_id:
            return redirect('main_navigation', parent_id=parent_id )
        else:
            return redirect('main_navigation')
        
    parent_id = data.Parent.id if data.Parent else None

    return render(request, 'update.html', {'data': data,'glob':glob,'parent_id':parent_id})

@login_required(login_url=settings.LOGIN_URL)
def delete_nav(request, pk):
    obj = get_object_or_404(Navigation, pk=pk)
    parent_id = None

    if request.method == "POST":
        parent_id = obj.Parent.id if obj.Parent else None
        obj.delete()

    if parent_id:
        return redirect('main_navigation', parent_id=parent_id)
    else:
        return redirect('main_navigation')
    
    
