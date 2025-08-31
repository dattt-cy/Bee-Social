import { usePathname, useRouter, useSearchParams } from "next/navigation";

function useSetLanguage() {
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    return (locale: string) => {
        const current = new URLSearchParams(Array.from(searchParams.entries()));

        current.set('lang', locale);

        // cast to string
        const search = current.toString();
        const query = search ? `?${search}` : '';

        router.push(`${pathname}${query}`);
    };
}

export default useSetLanguage;