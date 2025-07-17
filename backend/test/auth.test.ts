import request from 'supertest'
import { app } from '../src/index'
import prisma from '../src/prisma/client'
import { describe, it, expect, beforeEach, afterAll } from '@jest/globals'

const TEST_USER = {
  email: 'test@example.com',
  password: 'SecurePass123!',
  name: 'Test User'
}

describe('Auth Controller', () => {
  beforeEach(async () => {
    await prisma.user.deleteMany({ where: { email: TEST_USER.email } })
  })

  afterAll(async () => {
    await prisma.$disconnect()
  })

  it('should register a new user', async () => {
    const res = await request(app)
      .post('/auth/register')
      .send(TEST_USER)

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('token')
  })

  it('should login an existing user', async () => {
    await request(app).post('/auth/register').send(TEST_USER)
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: TEST_USER.email,
        password: TEST_USER.password
      })

    expect(res.statusCode).toEqual(200)
    expect(res.body).toHaveProperty('token')
  })

  it('should reject invalid login', async () => {
    const res = await request(app)
      .post('/auth/login')
      .send({
        email: TEST_USER.email,
        password: 'wrong_password'
      })

    expect(res.statusCode).toEqual(401)
  })
})