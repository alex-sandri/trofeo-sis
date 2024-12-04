from django.shortcuts import get_object_or_404, render

from .models import Sport


def index(request):
    sports = Sport.objects.all()
    return render(request, 'index.html', {'sports': sports})


def sport(request, sport_id):
    sport = get_object_or_404(Sport, pk=sport_id)
    return render(request, 'sport.html', {'sport': sport})
