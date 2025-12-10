import { ref } from 'vue';
import { onMounted } from 'vue';

export function useFetch(url) {

    // Variable reactiva per emmagatzemar les dades obtingudes del servidor
    const data = ref(null);
    
    // Variable reactiva per emmagatzemar el missatge d'error si algo falla
    const error = ref(null);
    
    // Variable reactiva per indicar si s'està fent la petició (true = carregant)
    const loading = ref(false);

    /**
     * Funció asíncrona que fa la petició HTTP al servidor
     * Gestiona tres fases: carregament, descàrrega de dades, i gestió d'errors
     */
    const fetchData = async () => {
        // Marcar que s'està carregant
        loading.value = true;
        
        // Netejar l'error anterior (si en teníem)
        error.value = null;
        
        try {
            // Fer petició GET a la URL i esperar resposta
            const res = await fetch(url.value);
            
            // Verificar si la resposta és correcta (status 200-299)
            // Si no, llancar error amb el codi de status
            if (!res.ok) throw new Error('Error al fetch: ' + res.status);
            
            // Convertir resposta a JSON i emmagatzemar-la a data
            data.value = await res.json();
            
            // Mostrar les dades a la consola per debugging
            console.log(data.value);

        } catch (err) {
            // Si error: emmagatzemar el missatge d'error
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