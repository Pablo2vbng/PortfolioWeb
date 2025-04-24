import streamlit as st
import folium
from streamlit_folium import st_folium
import random
import requests
from geopy.distance import geodesic
import time

# Tu clave de API de Google
API_KEY = "AIzaSyCwoafv-rlTpl0Tdk7hgx8QeE5yLfc-nAM"
OPENCAGE_API_KEY = "1863d83ce43f45ee9a776e1908abff47"  # Asegúrate de ingresar tu propia clave de OpenCage

# Configuración de la página
st.set_page_config(
    page_title="GeoGuessr Global 🌍",
    layout="wide",
)

st.title("🌍 GeoGuessr con Python")
st.markdown("¿Dónde crees que está esta imagen de Street View? Adivina haciendo clic en el mapa.")

# Función para generar imagen de Street View
def obtener_imagen_street_view(lat, lon):
    return f"https://maps.googleapis.com/maps/api/streetview?size=600x400&location={lat},{lon}&fov=90&heading=235&pitch=10&key={API_KEY}"

# Función para obtener el nombre del lugar a partir de las coordenadas usando OpenCage API
def obtener_nombre_lugar(lat, lon):
    url = f"https://api.opencagedata.com/geocode/v1/json?q={lat}+{lon}&key={OPENCAGE_API_KEY}"
    response = requests.get(url)
    data = response.json()
    if data['results']:
        return data['results'][0]['formatted']
    return "Ubicación desconocida"

# Función para generar coordenadas aleatorias en todo el mundo
def obtener_lugar_aleatorio():
    lat = random.uniform(-90.0, 90.0)  # Ampliamos a todo el mundo (de -90 a 90 grados de latitud)
    lon = random.uniform(-180.0, 180.0)  # Ampliamos a todo el mundo (de -180 a 180 grados de longitud)
    return lat, lon

# Función para verificar que la imagen esté disponible en Street View
def verificar_imagen_disponible(lat, lon):
    imagen_url = obtener_imagen_street_view(lat, lon)
    response = requests.get(imagen_url)
    # Si la respuesta es válida y no es la imagen de "no encontrado"
    if response.status_code == 200:
        return True
    return False

# Estado del juego
if 'lugar_real_lat' not in st.session_state or st.session_state.get('reset_game', False):
    # Generar una ubicación aleatoria y asegurarse de que la imagen esté disponible
    while True:
        lugar_real_lat, lugar_real_lon = obtener_lugar_aleatorio()
        if verificar_imagen_disponible(lugar_real_lat, lugar_real_lon):
            break
        time.sleep(1)  # Esperamos un segundo y luego intentamos nuevamente
    
    imagen_url = obtener_imagen_street_view(lugar_real_lat, lugar_real_lon)
    st.session_state['lugar_real_lat'] = lugar_real_lat
    st.session_state['lugar_real_lon'] = lugar_real_lon
    st.session_state['imagen_url'] = imagen_url
    st.session_state['adivinada'] = False  # Indicador de si se adivinó correctamente
    st.session_state['reset_game'] = False  # Reseteamos el estado de la variable

# Función para resetear el juego
def resetear_juego():
    # Restablecer las claves necesarias sin borrar todo el estado de la sesión
    st.session_state['reset_game'] = True  # Esto indica que el juego ha sido reseteado
    st.session_state['adivinada'] = False   # Reinicia si el juego ha sido adivinado

# Botón para reiniciar el juego
if st.button("Volver a jugar"):
    resetear_juego()

# Usamos columnas para organizar la imagen y el mapa lado a lado
col1, col2 = st.columns([1, 2])  # Relación de columnas (1 parte para la imagen, 2 partes para el mapa)

# Mostrar imagen de la ubicación aleatoria
with col1:
    st.image(st.session_state['imagen_url'], caption="¿Dónde crees que es?", use_container_width=True)

# Mapa para hacer la suposición
with col2:
    st.subheader("Haz clic en el mapa para adivinar dónde crees que es")
    mapa = folium.Map(location=[20, 0], zoom_start=2)
    mapa.add_child(folium.LatLngPopup())

    # Mostrar el mapa
    resultado = st_folium(mapa, height=500, width=800)

# Si el usuario ha hecho clic en el mapa
if resultado and resultado.get("last_clicked"):
    guess_lat = resultado["last_clicked"]["lat"]
    guess_lon = resultado["last_clicked"]["lng"]

    # Mostrar coordenadas
    st.markdown(f"### 📍 Tu suposición: {guess_lat:.4f}, {guess_lon:.4f}")

    # Obtener el nombre del lugar usando las coordenadas del clic
    nombre_lugar = obtener_nombre_lugar(guess_lat, guess_lon)
    st.markdown(f"### 📍 Nombre del lugar: {nombre_lugar}")

    # Calcular distancia
    distancia = geodesic((st.session_state['lugar_real_lat'], st.session_state['lugar_real_lon']), (guess_lat, guess_lon)).km
    st.success(f"🎯 Estás a {distancia:,.2f} km de la ubicación real")

    # Mostrar ubicaciones en mapa final
    resultado_mapa = folium.Map(location=[(guess_lat + st.session_state['lugar_real_lat'])/2, (guess_lon + st.session_state['lugar_real_lon'])/2], zoom_start=3)
    folium.Marker([guess_lat, guess_lon], tooltip="Tu suposición", icon=folium.Icon(color="blue")).add_to(resultado_mapa)
    folium.Marker([st.session_state['lugar_real_lat'], st.session_state['lugar_real_lon']], tooltip="Ubicación real", icon=folium.Icon(color="red")).add_to(resultado_mapa)
    folium.PolyLine([[guess_lat, guess_lon], [st.session_state['lugar_real_lat'], st.session_state['lugar_real_lon']]], color="green", weight=2).add_to(resultado_mapa)

    st.subheader("Comparativa entre tu suposición y el lugar real:")
    st_folium(resultado_mapa, height=500, width=800)
