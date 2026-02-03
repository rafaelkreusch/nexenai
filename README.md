# Chat de Valor

Interface web estilo WhatsApp com autenticação multiempresa. Cada organização tem seus usuários, integrações Evolution e histórico próprio.

## Requisitos

- Python 3.11+
- Ambiente em intranet para rodar o backend

## Configuração rápida

```bash
cd backend
python -m venv .venv
. .venv/Scripts/activate  # PowerShell: .venv\Scripts\Activate.ps1
pip install -r requirements.txt
python -m uvicorn app:app --reload --port 8000
```

Abra `http://localhost:8000`:
- Empresa demo: `demo`
- Usuário: `admin`
- Senha: `admin123`

Use o botão "Criar conta" para cadastrar uma nova empresa; o sistema cria um tenant isolado com seu próprio QR Code e conversas.
- O campo “Usuário principal” aceita apenas letras minúsculas, números, `.` e `_` (ex: `rafael_kreusch`) e é único em todo o sistema.
- Dentro de **Configurações → Usuários da empresa** é possível cadastrar novos logins, definir se cada um é administrador ou operador e ativar/desativar/resetar senhas.

## Estrutura

- `backend/`
  - `app.py`: rotas FastAPI, autenticação multi-tenant, integrações Evolution e entrega do frontend.
  - `models.py`: SQLModel para organizações, usuários, tokens, conversas, mensagens e sessões.
  - `db.py`: configuração SQLite + criação do banco.
  - `evolution.py`: cliente simplificado da Evolution API (mock quando não configurado).
- `frontend/`
  - `index.html`, `styles.css`, `app.js`: interface web (login/registro + chat) que consome o backend.

## Fluxo principal

1. **Cadastro/Login**: usuário informa o slug da empresa (ex: `minha-empresa`), credenciais e acessa. Ao registrar, um token já é retornado e o tenant é criado automaticamente.
2. **Conversas**: cada conversa fica vinculada ao usuário criador. Somente administradores enxergam todas as conversas da empresa; negociadores comuns veem apenas as suas, mesmo após trocar de chip/QR.
3. **Envio/Recebimento**: `POST /api/messages` envia via Evolution (ou mock). Webhook `/api/messages/incoming` aceita `session_code` para vincular mensagens à empresa correta.
4. **Troca de QR**: `/api/session/rotate` cria nova sessão para a empresa atual, mantendo o histórico.

## Endpoints relevantes

| Método | Rota | Descrição |
| --- | --- | --- |
| POST | `/api/auth/register` | Cria empresa + usuário administrador. |
| POST | `/api/auth/login` | Login informando slug da empresa. |
| GET | `/api/auth/me` | Retorna dados do usuário/empresa logados. |
| POST | `/api/auth/logout` | Revoga o token atual. |
| GET/POST | `/api/conversations` | Lista/cria conversas do tenant atual. |
| GET | `/api/conversations/{id}/messages` | Histórico filtrado pela empresa. |
| POST | `/api/messages` | Envia mensagem (agent ou debtor). |
| POST | `/api/messages/incoming` | Recebe webhook informando `session_code` ou `conversation_id`. |
| GET/POST | `/api/session` | Consulta ou rotaciona o QR por empresa. |
| GET | `/api/health` | Healthcheck simples. |

## Integração com Evolution API

1. Configure `backend/.env` com:
   ```env
   EVOLUTION_BASE_URL=https://evolution-api.seudominio.com
   EVOLUTION_INSTANCE_ID=seu-id
   EVOLUTION_TOKEN=seu-token
   ```
2. Cada empresa usa o mesmo conjunto de credenciais neste MVP, mas os registros ficam separados. Se preferir múltiplas credenciais, amplie o modelo de organização para armazená-las.
3. Configure o webhook da Evolution apontando para `https://seu-servidor/api/messages/incoming` e envie o `session_code` da empresa correspondente.

## Integra??o com Uazapi

Para permitir que cada empresa gere a pr?pria inst?ncia direto do painel:

1. Configure `backend/.env` com:
   ```env
   UAZAPI_ADMIN_BASE_URL=https://seu-gateway.uazapi.com
   UAZAPI_ADMIN_TOKEN=admintoken_fornecido_no_painel
   UAZAPI_DEFAULT_BASE_URL=https://seu-gateway.uazapi.com  # opcional (usa o mesmo valor do admin se vazio)
   ```
2. No frontend, abra **Integra??es ? Uazapi (modo servidor)** e clique em **Criar inst?ncia autom?tica (Uazapi)**. O backend chama `/instance/init`, guarda o token retornado para a organiza??o atual e j? traz o QR Code.
3. Caso j? tenha uma inst?ncia criada manualmente, basta preencher URL/ID/token como antes e clicar em **Gerar novo QR**.

## Painel de colaboradores

O botão **Colaboradores** na landing page abre `frontend/colaboradores.html`, onde um administrador pode fazer login, criar clientes, inspeccionar quantas organizações já existem e ajustar o `server_url`/`admin_token` de cada uma da Uazapi. A área usa os novos endpoints `/api/admin/organizations` e `/api/admin/organizations/{id}/credentials` e mantém os tokens fora do `.env`, permitindo que a gestão de instâncias fique centralizada sem redeploy.

## Próximos passos sugeridos

- Painel administrativo para gestão de usuários por empresa.
- Transferência de conversas entre negociadores e filas automáticas de distribuição.
- Suporte a múltiplas credenciais Evolution por organização.
- WebSockets para atualizações em tempo real.
- Upload/recebimento de mídia (áudio, imagem, documentos).
### Webhook global da Uazapi

- Quando uma instância usa os servidores da Uazapi, o webhook pode ser configurado automática- mente por cliente (o backend tenta criar o webhook com o token da instância). Se esse fluxo estiver apresentando falhas (ex.: `Invalid token`), fabrique um webhook **global** diretamente no painel da Uazapi apontando para `CHAT_WEBHOOK_URL`.
- Depois, defina `UAZAPI_USE_GLOBAL_WEBHOOK=1` no `.env`. Com a flag `1/true/yes/on` ativada o backend pula a configuração por instância e confia que o webhook global já recebe os eventos `messages` e `connection`.
- Cada organização continua cadastrando seu próprio **Server URL + Admin Token** no painel de colaboradores; essa variável só controla o comportamento do backend durante o provisionamento automático.

## Execução com Docker Compose

O projeto já inclui `Dockerfile` e `docker-compose.yml` na raiz. Para rodar o backend + PostgreSQL em contêineres:

1. Garanta que `backend/.env` contenha as credenciais corretas (Uazapi, webhook, etc). O Compose sobrescreve `DATABASE_URL` para `postgresql://appuser:secret@postgres:5432/chatdevalor`, então você não precisa mudá-la manualmente quando estiver usando o `docker compose`.
2. Na raiz do projeto execute:
   ```bash
   docker compose up --build
   ```
   Isso cria os serviços `postgres` (dados persistidos em `postgres_data`) e `backend`. Os logs aparecem no terminal, e o backend fica em `http://localhost:8000`.
3. Se quiser liberar a porta 5432 para o host (ex.: para inspecionar via `psql`), o compose já mapeia `5432:5432`. Use `docker compose down` para parar os contêineres e `docker compose up` novamente quando quiser retomar.

Com isso você tem um ambiente containerizado simples para testar no Fly.io, Render ou Azure antes de subir em produção.
