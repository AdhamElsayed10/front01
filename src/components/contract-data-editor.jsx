import React, { useState } from 'react';
import { Save } from 'lucide-react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';

function toDateInputValue(value) {
  if (!value) return '';
  const text = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;
  const match = text.match(/^(\d{1,2})\/(\d{1,2})\/(\d{4})$/);
  if (match) {
    return `${match[3]}-${match[2].padStart(2, '0')}-${match[1].padStart(2, '0')}`;
  }
  return '';
}

function buildInitialFormData(contractData) {
  const application = (contractData && contractData.applicationDetails) || {};
  const contract = (contractData && contractData.contractDetails) || {};
  const owner = (contractData && contractData.ownerDetails) || {};
  const tenant = (contractData && contractData.tenantDetails) || {};
  return {
    leaseType: contract.leaseType || 'Residential Lease',
    leaseTypeAr: contract.leaseTypeAr || 'عقد إيجار سكني',
    caseId: application.caseId || application.fmRef || '',
    contractNo: contract.contractNo || '',
    ownerName: owner.name || '',
    ownerNameAr: owner.nameAr || '',
    tenantName: tenant.name || '',
    tenantNameAr: tenant.nameAr || '',
    contractStartDate: toDateInputValue(contract.startDate),
    contractEndDate: toDateInputValue(contract.endDate),
  };
}

export function ContractDataEditor({ contractData, onSave, saving }) {
  const [formData, setFormData] = useState(() => buildInitialFormData(contractData));

  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onSave({
      contractData: {
        applicationDetails: { caseId: formData.caseId },
        contractDetails: {
          leaseType: formData.leaseType,
          leaseTypeAr: formData.leaseTypeAr,
          contractNo: formData.contractNo,
          startDate: formData.contractStartDate,
          endDate: formData.contractEndDate,
        },
        ownerDetails: { name: formData.ownerName, nameAr: formData.ownerNameAr },
        tenantDetails: { name: formData.tenantName, nameAr: formData.tenantNameAr },
      },
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Card className="p-4 space-y-3">
        <h3 className="heading text-sm">Contract details</h3>
        <p className="text-[11px] text-muted-foreground">
          These values appear in the bilingual case-details page and override the extracted PDF data.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-3">
          <div>
            <label className="label" htmlFor="cd-lease-type">Lease type</label>
            <Input
              id="cd-lease-type"
              value={formData.leaseType}
              onChange={(e) => updateField('leaseType', e.target.value)}
              className="h-9"
            />
          </div>
          <div>
            <label className="label" htmlFor="cd-lease-type-ar">Lease type (Arabic)</label>
            <Input
              id="cd-lease-type-ar"
              dir="rtl"
              value={formData.leaseTypeAr}
              onChange={(e) => updateField('leaseTypeAr', e.target.value)}
              className="h-9"
            />
          </div>
          <div>
            <label className="label" htmlFor="cd-case-id">Case ID</label>
            <Input
              id="cd-case-id"
              value={formData.caseId}
              onChange={(e) => updateField('caseId', e.target.value)}
              className="h-9"
            />
          </div>
          <div>
            <label className="label" htmlFor="cd-contract-number">Contract number</label>
            <Input
              id="cd-contract-number"
              value={formData.contractNo}
              onChange={(e) => updateField('contractNo', e.target.value)}
              className="h-9"
            />
          </div>
          <div>
            <label className="label" htmlFor="cd-owner-name">Owner</label>
            <Input
              id="cd-owner-name"
              value={formData.ownerName}
              onChange={(e) => updateField('ownerName', e.target.value)}
              className="h-9"
            />
          </div>
          <div>
            <label className="label" htmlFor="cd-owner-name-ar">Owner (Arabic)</label>
            <Input
              id="cd-owner-name-ar"
              dir="rtl"
              value={formData.ownerNameAr}
              onChange={(e) => updateField('ownerNameAr', e.target.value)}
              className="h-9"
            />
          </div>
          <div>
            <label className="label" htmlFor="cd-tenant-name">Lessee</label>
            <Input
              id="cd-tenant-name"
              value={formData.tenantName}
              onChange={(e) => updateField('tenantName', e.target.value)}
              className="h-9"
            />
          </div>
          <div>
            <label className="label" htmlFor="cd-tenant-name-ar">Lessee (Arabic)</label>
            <Input
              id="cd-tenant-name-ar"
              dir="rtl"
              value={formData.tenantNameAr}
              onChange={(e) => updateField('tenantNameAr', e.target.value)}
              className="h-9"
            />
          </div>
          <div>
            <label className="label" htmlFor="cd-start-date">Contract start date</label>
            <Input
              id="cd-start-date"
              type="date"
              value={formData.contractStartDate}
              onChange={(e) => updateField('contractStartDate', e.target.value)}
              className="h-9"
            />
          </div>
          <div>
            <label className="label" htmlFor="cd-end-date">Contract end date</label>
            <Input
              id="cd-end-date"
              type="date"
              value={formData.contractEndDate}
              onChange={(e) => updateField('contractEndDate', e.target.value)}
              className="h-9"
            />
          </div>
        </div>
      </Card>

      <div className="flex items-center justify-end pt-1">
        <Button type="submit" size="sm" disabled={saving}>
          <Save size={13} />
          {saving ? 'Saving…' : 'Save changes'}
        </Button>
      </div>
    </form>
  );
}

export default ContractDataEditor;
