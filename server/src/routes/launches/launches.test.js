const request = require('supertest');

const app = require('../../app');

describe('Test Get /launches', () => {
    test('It should response with status 200 success', async () => {
        const response = await request(app)
            .get('/launches')
            .expect('Content-Type', /json/)
            .expect(200)
    })
})

describe('Test POST /launches', () => {
    const completeLaunchData = {
        mission: 'Find Life',
        rocket: 'FL2001',
        launchDate: 'September 9, 2029',
        target: 'Kepler-442 b',
    }
    
    const launchDataWithoutLaunchDate = {
        mission: 'Find Life',
        rocket: 'FL2001',
        target: 'Kepler-442 b',
    }
    
    const launchDataWithInvalidLaunchDate = {
        mission: "Find Life",
        rocket: "FL2001",
        launchDate: "picachu",
        target: "Kepler-442 b"
    }

    test('It should response with status 201 created', async () => {
        const response = await request(app)
            .post('/launches')
            .send(completeLaunchData)
            .expect('Content-Type', /json/)
            .expect(201)

            const requestDate = new Date(completeLaunchData.launchDate).valueOf()
            const responseDate = new Date(response.body.launchDate).valueOf()

            expect(responseDate).toBe(requestDate)

            expect(response.body).toMatchObject(launchDataWithoutLaunchDate)
    })

    test('It should response with required fields cannot be empty', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithoutLaunchDate)
            .expect(400)

            expect(response.body).toMatchObject({error: 'Missing required launch property.'})
    })

    test('It should response with Invalid Date', async () => {
        const response = await request(app)
            .post('/launches')
            .send(launchDataWithInvalidLaunchDate)
            .expect(400)

            expect(response.body).toMatchObject({error: 'Please enter a valid date.'})
    })
})