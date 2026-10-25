# Recados: tradução sob demanda

Integração DeepL REST, sem SDK nem chave no frontend. Não altera os recados ou depoimentos originais.

Para ativar em um ambiente escolhido explicitamente:
1. Execute `src/main/resources/db/scrap-translations.sql` nesse banco (o projeto usa `ddl-auto=none`).
2. Configure `DEEPL_API_KEY` somente no ambiente do backend. Chaves Free terminam em `:fx`; as demais usam a API Pro.
3. Reinicie o backend. Nenhuma configuração de produção foi alterada nesta implementação.

Referência oficial: https://developers.deepl.com/api-reference/translate

O endpoint POST `/api/scraps/{id}/translations/{pt|en|es|fr}` aceita apenas IDs de recados aprovados. Não aceita texto arbitrário nem URL de provedor. Cache persistente usa SHA-256 do original + idioma; mudanças no texto invalidam o cache naturalmente. Falhas não são armazenadas. Cliques simultâneos são serializados nesta instância; instalações com múltiplas réplicas podem precisar de coordenação distribuída. Chamadas têm timeouts e não fazem retries automáticos pagos.

A detecção do idioma vem da tradução sob demanda; quando ainda é desconhecido, a ação de traduzir fica disponível. Após identificar o mesmo idioma, a ação é ocultada. Isso evita chamadas pagas apenas para detectar idioma ao carregar a lista. Textos mistos e muito curtos podem ter detecção imprecisa.

Quebras de linha e linhas sem letras (emojis/arte decorativa) são preservadas no backend. O provedor recebe apenas linhas com letras, com preservação de formatação. Arte com letras e gírias ainda devem ser conferidas manualmente: nenhum tradutor garante reprodução exata de estilo.

Verificação manual: configurar banco/chave num ambiente local; testar tradução, alternância, troca de idioma, cache após recarregar, timeout e chave ausente/inválida. A primeira tradução envia o texto ao DeepL.
