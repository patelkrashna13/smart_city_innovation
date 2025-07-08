from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.reverse import reverse

@api_view(['GET'])
def api_root(request, format=None):
    return Response({
        'auth': {
            'login': reverse('login', request=request, format=format),
            'register': reverse('register', request=request, format=format),
            'profile': reverse('profile', request=request, format=format),
        },
        'status': 'Smart City Platform API is running',
        'version': '1.0.0'
    })
