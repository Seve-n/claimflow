import type { User } from "@/types";

export const MOCK_USER_ID = "usr-thomas-martin";

/** The demo account's user profile. All data is fictional. */
export const mockUser: User = {
  id: MOCK_USER_ID,
  firstName: "Thomas",
  lastName: "Martin",
  email: "demo@claimflow.app",
  phone: "+32 478 12 34 56",
  address: "Rue de la Loi 42, 1000 Brussels, Belgium",
  createdAt: "2024-11-03T09:00:00.000Z",
};
