#
#
#   POLARBURR#9201
#   CS50W 2020 CAPSTONE

import os
import json
from django.shortcuts import HttpResponse, HttpResponseRedirect, render
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from django.http import JsonResponse
from django.urls import reverse
from django.contrib import messages
from gtts import gTTS
from .models import *
from .forms import ImageForm

def index(request):
    return render(request, "pecs/index.html", {
        'tags': Tag.objects.all(),
    })

def about(request):
    return render(request, "pecs/about.html")

def pecs(request):
    
    images = Image.objects.filter(user__in={2, request.user.id})
    faves = None
    if Favorite.objects.filter(user=request.user.id).exists():
        faves = Favorite.objects.filter(user=request.user.id).values_list('pecs__id', flat=True)
    
    if request.GET.get('cat'):
        cat = request.GET['cat'].lower()
        if cat == 'faves':
            if Favorite.objects.filter(user=request.user.id).exists():
                images = Favorite.objects.get(user=request.user.id).pecs.all()
            else:
                images = None

        elif cat != 'all': 
            images = Image.objects.filter(user__in={2, request.user.id}, tag=cat)

    return render(request, "pecs/pecs.html", {
        'tags': Tag.objects.all(),
        'images': images,
        'faves': faves,
    })

@login_required(login_url='login')
def fave(request):
    if request.method== 'PUT':
        data = json.loads(request.body)
        pecs = Image.objects.get(pk=data['id'])
        fave_stat = 'add'
        if Favorite.objects.filter(user=request.user.id).exists():
            faves = Favorite.objects.get(user=request.user.id).pecs
            if faves.filter(id=data['id']).exists():
                faves.remove(pecs)
                fave_stat = 'del'
            else:
                faves.add(pecs)

        else: 
            faves = Favorite(user=User.objects.get(pk=user.request.id))
            faves.save()
            faves.add(pecs)

    return JsonResponse({
        "message": "fave success",
        "fave_stat": fave_stat,
            }, status=201) 


@login_required(login_url='login')
def upload(request):

    if request.method == "POST":
        form = ImageForm(request.POST, request.FILES)
        if form.is_valid():
            new_image = form.save(commit=False)
            new_image.user = request.user
            new_image.description = form.cleaned_data['description'].lower()
            new_image.save()
            form.save_m2m()
            convert_speech(form.cleaned_data['description'], form.instance.id)
        #file = request.files['file']
        #filename = secure_filename(file.filename).lower()
        #file.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
           
        messages.success(request, "File Uploaded Successfully")
        request.session['uploaded'] = new_image.id
        return HttpResponseRedirect(reverse("upload"))

    else:    
        form = ImageForm()
        try:
            if request.session['uploaded']:
                image = Image.objects.get(pk=request.session['uploaded'])
                del request.session['uploaded']
        except: 
            image = None
        return render(request, "pecs/upload.html", {
            "tags": Tag.objects.all(),
            "form": form,
            "image": image
        })

@login_required
def edit(request):
    
    images = Image.objects.filter(user=request.user.id)

    if request.method == 'PUT':
        data = json.loads(request.body)
        action=data['action']
        pecs_id=data['id']
        image = Image.objects.get(pk=pecs_id)

        if image.user.id == request.user.id:
            if action == 'desc':
                convert_speech(data['update'], pecs_id)
                image.description = data['update'].lower()
                image.save()

            elif action == 'tag':
                tag=Tag.objects.get(pk__in = data['update'])
                image.tag = tag      
                image.save()
            else:
                image.delete()
                os.remove(f'upload/{image.name}')
                os.remove(f'upload/audio/{pecs_id}.mp3')

            return JsonResponse({
                "message": "success",
                "count": images.count(),
                    }, status=201) 
        else:
            return JsonResponse({
                "message": "unauthorized access",
                "status": 401,
                    }, status=401)

    return render(request, "pecs/edit.html", {
        'tags': Tag.objects.all(),
        'images': images,
    })

def print_pecs(request):
    return render(request, "pecs/print.html", {
        'tags': Tag.objects.all(),
        'images': Image.objects.filter(user__in={2, request.user.id}),
    })    

@login_required
def convert(request):

    if (request.user.id == 1): 

        if request.method =="POST":
            text = request.POST['text']
            file_name = request.POST['name']
            convert_speech(text, file_name)
            messages.success(request, "Speech Converted Successfully")
        
        return render(request, "pecs/convert.html")

    return HttpResponseRedirect(reverse("index"))

def login_view(request):
    if request.method == "POST":

        # Attempt to sign user in
        username = request.POST["username"]
        password = request.POST["password"]
        user = authenticate(request, username=username, password=password)

        # Check if authentication successful
        if user is not None:
            login(request, user)
            messages.success(request, "Logged In Successfully.")
            return HttpResponseRedirect(reverse("index"))
        else:
            messages.error(request, "Invalid username and/or password.")
            return HttpResponseRedirect(reverse("login"))
    else:
        return render(request, "pecs/login.html")

def logout_view(request):
    logout(request)
    messages.success(request, "Logged Out Successfully.")
    return HttpResponseRedirect(reverse("index"))

def register(request):
    if request.method == "POST":
        username = request.POST["username"]
        email = request.POST["email"]

        # Ensure password matches confirmation
        password = request.POST["password"]
        confirmation = request.POST["confirmation"]
        if password != confirmation:
            messages.error(request, "Passwords must match.")
            return render(request, "pecs/register.html")
        # Attempt to create new user
        try:
            user = User.objects.create_user(username, email, password)
            user.save()
        except IntegrityError:
            messages.error(request, "Username already taken.")
            return render(request, "pecs/register.html")
        login(request, user)
        return HttpResponseRedirect(reverse("index"))
    
    else:
        return render(request, "pecs/register.html")


def convert_speech(text, file_name):
    #if not os.path.isfile("static/audio/" + text + ".mp3"):
    convert = gTTS(text=text, lang='en')
    convert.save(f"upload/audio/{file_name}.mp3")
        