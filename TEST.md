# API routes

1. `http://localhost:2300/patients`
2. `http://localhost:2300/doctors`
3. `http://localhost:2300/appointments`
4. `http://localhost:2300/admin`

Making Request From Your Terminal:

```bash
curl -X POST "https://api.example.com/endpoint" -H "Content-Type: application/json" -d '{"key1":"value1", "key2":"value2"}'

```

## Patients

Register: `http://localhost:2300/patients/register`

```bash
curl -v -X POST "http://localhost:2300/patients/register" -H "Content-Type: application/json" -d '{"first_name":"John", "last_name":"Smith", "email":"johnsmith123@example.com", "password":"12345678", "phone":"+123456789", "date_of_birth":"1986-07-25", "gender":"male", "address":"Earth"}'
```

LogIn: `http://localhost:2300/patients/login`

```bash
curl -v -X POST "http://localhost:2300/patients/login" -H "Content-Type: application/json" -d '{"email":"johnsmith@example.com", "password":"12345"}'
```

LogOut: `http://localhost:2300/patients/logout`

```bash
curl -v -X GET "http://localhost:2300/patients/logout"
```

Profile: `http://localhost:2300/patients/profile`

Delete: `http://localhost:2300/patients/delete`

## Doctors

1. addDoctor: `http://localhost:2300/doctors/add`
2. getDoctors: `http://localhost:2300/doctors`
3. updateDoctor: `http://localhost:2300/doctors/:id`
4. updateSchedule: `http://localhost:2300/doctors/:id/schedule`
5. Delete: `http://localhost:2300/doctors/:id'`

## Appointments

1. bookAppointment: `http://localhost:2300/appointments/book`
2. getAppointments: `http://localhost:2300/appointments`
3. getAppointmentById: `http://localhost:2300/appointments/:id`
4. rescheduleAppointment: `http://localhost:2300/appointments/:id`
5. updateAppointmentStatus: `http://localhost:2300/appointments/:id/status`
6. cancelAppointment: `http://localhost:2300/appointments/:id/cancel`

## Admin

Register: `http://localhost:2300/admin/register`

```bash
curl -v -X POST "http://localhost:2300/admin/register" -H "Content-Type: application/json" -d '{"username":"manager", "password":"password123", "role":"superadmin"}'
```

LogIn: `http://localhost:2300/admin/login`

LogOut: `http://localhost:2300/admin/logout`

Profile: `http://localhost:2300/admin//patients/:search?/:filterByGender?`
