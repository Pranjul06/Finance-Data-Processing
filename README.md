# Finance Data Processing Backend

A structured, performant, and secure backend system for financial data processing and dashboard operations. Designed with a clear separation of concerns, Role-Based Access Control (RBAC), and rigorous payload validation.

## 🚀 Setup & Execution

### Installation
Ensure you have Node.js installed, then run the native scripts:
```bash
npm install
```

### Running Locally
```bash
# Start the local development server (runs on port 3000)
npm run start
```

---

## 📖 API Documentation

This system relies on custom middleware to parse a simulated authenticated user identity securely for evaluating assignment tasks seamlessly without JWT overhead.

**Headers Required**: 
- `x-user-id: admin-1` (simulates logged-in Administrator)
- `Content-Type: application/json`

### 1. User Management
Secure endpoints intended to regulate access layers. Restricted to **ADMIN** role.

- **GET `/api/users`**
  - Returns a list of all active/inactive users in the system.
- **POST `/api/users`**
  - Payload: `{ "username": "alice", "role": "ANALYST" }`
  - Creates a new secured identity.
- **PUT `/api/users/:id`**
  - Modifies a user's role or status.
- **DELETE `/api/users/:id`**
  - Soft-deletes a user by updating their status to `INACTIVE`.

### 2. Financial Records
Core interaction APIs for logging and reading transactions.

- **POST `/api/records`** [ADMIN ONLY]
  - Logs a new income or expense transaction.
  - Payload:
    ```json
    {
      "amount": 5000,
      "type": "INCOME", // or "EXPENSE"
      "category": "Salary",
      "date": "2024-04-01T00:00:00Z",
      "notes": "Optional details"
    }
    ```
- **GET `/api/records`** [ADMIN & ANALYST]
  - Retrieves a chronological listing of financial statements.
  - Supports query filters: `?type=INCOME`, `?category=Salary`, `?startDate=2024-01-01`, `?endDate=2024-12-31`
- **GET `/api/records/:id`** [ADMIN & ANALYST]
  - View individual record objects explicitly.
- **PUT `/api/records/:id`** [ADMIN ONLY]
  - Edits a transaction.
- **DELETE `/api/records/:id`** [ADMIN ONLY]
  - Fully drops a transaction history.

### 3. Dashboard Summaries
Analytic endpoints structured for rapid UI ingestion. 

- **GET `/api/dashboard/summary`** [VIEWER, ANALYST, ADMIN]
  - Compiles aggregates, calculates net balance, groups category sums, and returns the 5 latest transactional records globally.
  - Response format:
    ```json
    {
      "summary": { "totalIncome": 5000, "totalExpense": 0, "netBalance": 5000 },
      "categoryWiseTotals": [ { "category": "Salary", "type": "INCOME", "total": 5000 } ],
      "recentRecords": [ /* Object Lists */ ]
    }
    ```

---

## 🛠 Architectural Highlights

1. **Native Zod Validations**: Boundary requests are secured tightly preventing logical pollution.
2. **Simplified Memory Structure**: An abstracted local JSON memory block simulates Database logic eliminating external friction points strictly matching allowed scenario parameters.
3. **Explicit RBAC**: Middlewares guarantee access is constrained inherently globally (`requireRoles`).
