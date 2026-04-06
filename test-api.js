const makeRequest = async (method, path, body) => {
  const options = {
    method,
    headers: {
      'x-user-id': 'admin-1',
      'Content-Type': 'application/json',
    },
  };
  if (body) {
    options.body = JSON.stringify(body);
  }
  const res = await fetch(`http://localhost:3000${path}`, options);
  return await res.json();
};

const run = async () => {
  console.log('1. Initial Dashboard Summary:');
  const d1 = await makeRequest('GET', '/api/dashboard/summary');
  console.log(JSON.stringify(d1, null, 2));

  console.log('\n2. Creating an Income Record:');
  const d2 = await makeRequest('POST', '/api/records', { amount: 5000, type: 'INCOME', category: 'Salary', date: new Date().toISOString() });
  console.log(JSON.stringify(d2, null, 2));

  console.log('\n3. Creating an Expense Record:');
  const d3 = await makeRequest('POST', '/api/records', { amount: 200, type: 'EXPENSE', category: 'Groceries', date: new Date().toISOString() });
  console.log(JSON.stringify(d3, null, 2));

  console.log('\n4. Updated Dashboard Summary:');
  const d4 = await makeRequest('GET', '/api/dashboard/summary');
  console.log(JSON.stringify(d4, null, 2));
};

run().catch(console.error);
