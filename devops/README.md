```

Never commit `.env` or real credentials.

### Start PostgreSQL + PostGIS

From the CivicLens repository root:

```bash
docker compose --env-file .env -f devops/docker/docker-compose.yml up -d
```

### Stop PostgreSQL + PostGIS

```bash
docker compose --env-file .env -f devops/docker/docker-compose.yml down
```

### Check Database Status

```bash
docker ps
```

Check database health:

```bash
docker inspect --format='{{.State.Health.Status}}' civiclens-postgres
```

Expected:

```text
healthy
```

### Verify PostGIS

```bash
docker exec -it civiclens-postgres psql -U civiclens -d civiclens -c "SELECT PostGIS_Version();"
```

### Local Database Connection

| Setting | Value |
|---|---|
| Host | localhost |
| Port | 5432 |
| Database | civiclens |
| User | civiclens |
| Password | Set through `.env` |

### Persistent Storage

PostgreSQL data is stored in the Docker volume:

```text
civiclens_postgres_data
```

The volume keeps database data persistent when the PostgreSQL container is stopped or recreated.

### Docker Configuration

Compose file:

```text
devops/docker/docker-compose.yml
```

The database configuration includes:

- PostgreSQL 16
- PostGIS 3.4
- Persistent Docker volume
- Environment-based configuration
- PostgreSQL health check
- Port 5432

## Security

- Never commit `.env`.
- Never commit real passwords or API keys.
- Never place secrets inside Dockerfiles.
- Use environment variables for local configuration.
- Production secrets must use an approved secret-management mechanism.