import type { inferQueryResponse } from '@/utils/inferQueryResponse'

export type User = inferQueryResponse<'me'>['user']
