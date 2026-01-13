import { ref } from 'vue';

export function useFetch(url) {

    const data = ref(null);
    const error = ref(null);
    const loading = ref(false);

    const fetchData = async () => {
        loading.value = true;
        error.value = null;
        try {
            const res = await fetch(url);
            if (!res.ok) throw new Error('Error al fetch: ' + res.status);
            data.value =  await res.json();

        } catch (err) {
            error.value = err.message;

        } finally {
            loading.value = false;

        }
    }


    return { data, error, loading, fetchData }

}