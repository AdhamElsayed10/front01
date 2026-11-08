export function getPublicDocumentUrl(documentRecord) {
  if (!documentRecord?.qrToken) return documentRecord?.qrUrl || '';
  return `${window.location.origin}/pdf/${encodeURIComponent(documentRecord.qrToken)}`;
}
