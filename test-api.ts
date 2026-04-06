import http from 'http';

const makeRequest = (method: string, path: string, body?: any) => {
  return new Promise((resolve, reject) => {
    const data = body ? JSON.stringify(body) : '';
    const options = {
      hostname: 'localhost',
      port: 3000,
      path,
      method,
      headers: {
        'x-user-id': 'admin-1',
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data),
      },
    };

    const req = http.request(options, (res) => {
      let result = '';
      res.on('data', (chunk) => { result += chunk; });
      res.on('end', () => { resolve(JSON.parse(result)); });
    });

    req.on('error', reject);
    if (data) req.write(data);
    req.end();
  });
};

(async () => {
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
})();
