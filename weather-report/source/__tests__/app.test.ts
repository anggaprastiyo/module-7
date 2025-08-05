import request from 'supertest';
import express from 'express';
import { app } from '../app';

describe('Weather API', () => {
  let server: express.Application;

  beforeAll(() => {
    server = app;
  });

  describe('GET /health', () => {
    it('should return 200 OK', async () => {
      const response = await request(server).get('/health');
      expect(response.status).toBe(200);
    });
  });

  describe('GET /weather', () => {
    it('should return 400 when no city parameter is provided', async () => {
      const response = await request(server).get('/weather');
      expect(response.status).toBe(400);
    });

    it('should return 400 when city parameter is empty', async () => {
      const response = await request(server).get('/weather?city=');
      expect(response.status).toBe(400);
    });
  });

  describe('POST /weather', () => {
    it('should return 400 when no city in request body', async () => {
      const response = await request(server)
        .post('/weather')
        .send({});
      expect(response.status).toBe(400);
    });

    it('should return 400 when city is empty string', async () => {
      const response = await request(server)
        .post('/weather')
        .send({ city: '' });
      expect(response.status).toBe(400);
    });
  });
}); 