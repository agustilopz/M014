import { ref } from 'vue';
import { onMounted } from 'vue';

export function useFetch(url) {

    const data = ref(null);
    const error = ref(null);
    const loading = ref(false);

    const fetchData = async () => {
        loading.value = true;
        error.value = null;
        
        try {
            // Fer petició GET a la URL i esperar resposta (incloent cookies per al JWT)
            const res = await fetch(url.value, {
                credentials: 'include'
            });
            
            // Verificar si la resposta és correcta (status 200-299)
            // Si no, llancar error amb el codi de status
            if (!res.ok) throw new Error('Error al fetch: ' + res.status);
            
            // Convertir resposta a JSON i emmagatzemar-la a data
            data.value = await res.json();

        } catch (err) {
            error.value = err.message;

        } finally {
            // Marcar que ja ha acabat de carrega (tant si va anar bé com si va fallar)
            loading.value = false;

        }
    }
    
    // Executar fetchData quan el component es munta (quan es carrega a pantalla)
    onMounted(fetchData);

    // Retornar les variables i funcions perquè el component les pugui usar
    return { data, error, loading, fetchData }

}