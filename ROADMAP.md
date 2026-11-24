# Lorkut Roadmap

## Agora — revisão e qualidade do portfólio

- [x] Melhorar estado ativo do seletor de idiomas
- [x] Corrigir aparência do ícone de busca
- [x] Implementar busca do site
- [x] Corrigir navegação dos resultados da busca
- [x] Adicionar botão de voltar ao topo
- [x] Melhorar experiência dos recados no mobile
- [x] Adicionar “Ver mais / Ver menos” aos recados longos
- [ ] Testar busca, botão de topo e recados após deploy
- [ ] Ativar tradução automática dos recados
  - [ ] Aplicar e verificar a migration Flyway V3 na primeira inicialização autorizada em produção
  - [ ] Criar/configurar chave da API DeepL
  - [ ] Adicionar `DEEPL_API_KEY` ao backend na Railway
  - [ ] Testar tradução real
  - [ ] Testar “Ver original”
  - [ ] Confirmar funcionamento do cache
- [ ] Fazer controle de qualidade técnico geral
- [ ] Revisar links e botões restantes
- [ ] Revisar traduções restantes
- [ ] Revisar console e erros de produção

## Privacidade e dados dos usuários

- [x] Auditar quais dados o site coleta e onde são armazenados
- [x] Revisar fluxo de envio dos recados
- [x] Revisar upload e armazenamento das fotos no Cloudinary
- [x] Definir processo para solicitação de remoção de foto/recado
- [x] Definir texto de consentimento no envio de recados/fotos
- [x] Criar ou revisar Política de Privacidade
- [x] Auditar cookies, localStorage, analytics e serviços externos
- [ ] Validar o contato de privacidade, a retenção e as configurações de produção dos provedores
- [ ] Preparar a ativação coordenada do fluxo de fotos e moderação
- [ ] Determinar se o site realmente precisa de banner de cookies
- [ ] Implementar consentimento de cookies apenas se necessário

## Documentação e organização técnica

- [x] Revisar os arquivos Markdown e atualizar o README e o contexto do projeto
- [x] Referenciar `backend/TRANSLATION.md` pelo README e manter a configuração detalhada no guia
- [ ] Revisar scripts SQL e documentação do banco

## Conteúdo e projetos

- [x] Adicionar BMV Makeup e Portuguese with Thais ao catálogo do Lorkut
- [x] Atualizar o conteúdo e a stack de Marina Rodrigues Photography e Au Pair na Espanha
- [x] Padronizar status, recursos e capturas dos projetos em destaque em quatro idiomas
- [ ] Conferir projetos e comunidades com os dados publicados

## Activity Feed

- [x] Criar `ActivityFeed` model
- [x] Criar `ActivityFeedRepository`
- [x] Criar `ActivityFeedService`
- [x] Criar `GET /api/feed`
- [x] Renderizar feed na Home
- [x] Exibir projetos existentes no feed
- [x] Exibir comunidades existentes no feed
- [ ] Gerar atividade automaticamente ao criar projeto
- [ ] Gerar atividade automaticamente ao criar comunidade
- [ ] Separar tipos de atividade em componentes React
- [ ] Internacionalizar descrições vindas do banco

## Admin — evolução futura

- [ ] Autenticação
- [ ] CRUD de projetos
- [ ] CRUD de comunidades
- [ ] CRUD de fotos e vídeos
- [ ] CRUD de depoimentos

## Mídia — evolução futura

- [ ] Criar álbuns de fotos
- [ ] Criar vídeos e álbuns
- [ ] Integrar mídia ao feed

## Jogos — evolução futura

- [ ] Definir primeiro jogo
- [ ] Criar módulo separado

## Estudos técnicos

- [ ] Começar prática de TypeScript em uma tarefa ou projeto adequado
- [ ] Praticar tipagem de objetos e props
- [ ] Praticar consumo de APIs com tipos
- [ ] Construir experiência suficiente para usar TypeScript em projetos profissionais
