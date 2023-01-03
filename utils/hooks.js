import { useState, useEffect } from "react";

function useFetch(url, dependencies, parser = async (result) => await result.json()) {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);
    const fetchData = async () => {
        try {
            const result = await fetch(url);
            setData(await parser(result));
        } catch (error) {
            setIsError(true);
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(
        () => {
            fetchData();
        },
        // eslint-disable-next-line react-hooks/exhaustive-deps
        dependencies
    );
    return { data, isLoading, isError };
}

export { useFetch };
