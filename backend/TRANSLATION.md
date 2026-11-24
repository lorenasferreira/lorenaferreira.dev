# Recados: tradução sob demanda

Integração DeepL REST, sem SDK nem chave no frontend. Não altera os recados ou depoimentos originais.

Para ativar em um ambiente escolhido explicitamente:
1. Confirme que a migration Flyway `V3__create_scrap_translations.sql` consta como aplicada em `flyway_schema_history`. Siga o [procedimento de baseline](../README.md#database-migrations) para bancos existentes sem histórico.
2. Configure `DEEPL_API_KEY` somente no ambiente do backend. Chaves Free terminam em `:fx`; as demais usam a API Pro.
3. Reinicie o backend. Nenhuma configuração de produção foi alterada nesta implementação.

Referência oficial: https://developers.deepl.com/api-reference/translate

O endpoint POST `/api/scraps/{id}/translations/{pt|en|es|fr}` aceita apenas IDs de recados aprovados. Não aceita texto arbitrário nem URL de provedor. Cache persistente usa SHA-256 do original + idioma; mudanças no texto invalidam o cache naturalmente. Falhas não são armazenadas. Cliques simultâneos são serializados nesta instância; instalações com múltiplas réplicas podem precisar de coordenação distribuída. Chamadas têm timeouts e não fazem retries automáticos pagos.

A detecção do idioma vem da tradução sob demanda; quando ainda é desconhecido, a ação de traduzir fica disponível. Após identificar o mesmo idioma, a ação é ocultada. Isso evita chamadas pagas apenas para detectar idioma ao carregar a lista. Textos mistos e muito curtos podem ter detecção imprecisa.

Quebras de linha e linhas sem letras (emojis/arte decorativa) são preservadas no backend. O provedor recebe apenas linhas com letras, com preservação de formatação. Arte com letras e gírias ainda devem ser conferidas manualmente: nenhum tradutor garante reprodução exata de estilo.

Verificação manual: configurar banco/chave num ambiente local; testar tradução, alternância, troca de idioma, cache após recarregar, timeout e chave ausente/inválida. A primeira tradução envia o texto ao DeepL.

## Remoção de recados

A exclusão administrativa de um recado remove as chaves do cache derivadas de seu texto nos quatro idiomas, na mesma transação da exclusão do registro. Como a chave identifica o texto, um recado com texto idêntico poderá precisar gerar a tradução novamente. Isso limpa o cache do Lorkut. A retenção de dados processados pelo provedor depende da configuração e do serviço contratado.

A tabela criada pela V3 precisa existir antes de habilitar a exclusão administrativa. A chave DeepL continua opcional para excluir recados. O navegador guarda traduções na memória da página até que ela seja recarregada.
