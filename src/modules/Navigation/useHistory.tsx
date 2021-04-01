import { History } from "history"

import { useNavigationStore } from "./useNavigationStore"

export const useHistory: () => History = () => useNavigationStore()
