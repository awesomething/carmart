import type { AwaitedPageProps, FilterOptions } from "@/config/types";

interface AdminTableFooterProps extends AwaitedPageProps {
	disabled: boolean;
	totalPages: number;
	baseURL: string;
	cols: number;
}