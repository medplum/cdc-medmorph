import { MockClient } from '@medplum/mock';
import { expect, test } from 'vitest';
import { handler } from './stripe-create-invoice';

const medplum = new MockClient();
// npm t src/examples/stripe-bots/stripe-create-invoice.test.ts

test('Create PDF', async () => {
  // This input is a Stripe Event object from https://stripe.com/docs/webhooks/stripe-events
  const input = {
    id: 'evt_1MqItaDlo6kh7lYQKFQhFJ2J',
    object: 'event',
    api_version: '2017-01-27',
    created: 1679934466,
    data: {
      object: {
        id: 'in_1MqItaDlo6kh7lYQePA5sWyu',
        object: 'invoice',
        account_country: 'US',
        account_name: 'My Stripe Account',
        account_tax_ids: null,
        amount_due: 50,
        amount_paid: 0,
        amount_remaining: 50,
        amount_shipping: 0,
        application: null,
        application_fee: null,
        attempt_count: 0,
        attempted: false,
        auto_advance: false,
        automatic_tax: {
          enabled: false,
          status: null,
        },
        billing: 'send_invoice',
        billing_reason: 'manual',
        charge: null,
        closed: true,
        collection_method: 'send_invoice',
        created: 1679934466,
        currency: 'usd',
        custom_fields: null,
        customer: 'cus_NbVsQyfd9GyCHq',
        customer_address: null,
        customer_email: 'customer@example.com',
        customer_name: 'Customer Example',
        customer_phone: null,
        customer_shipping: null,
        customer_tax_exempt: 'none',
        customer_tax_ids: [],
        date: 1679934466,
        default_payment_method: null,
        default_source: null,
        default_tax_rates: [],
        description: null,
        discount: null,
        discounts: [],
        due_date: null,
        ending_balance: null,
        finalized_at: null,
        footer: 'Thank you for your business!',
        forgiven: false,
        from_invoice: {
          action: 'revision',
          invoice: 'in_1MqIqvDlo6kh7lYQT5hznXq6',
        },
        hosted_invoice_url: null,
        invoice_pdf: null,
        last_finalization_error: null,
        latest_revision: null,
        lines: {
          object: 'list',
          data: [
            {
              id: 'ii_1MqItaDlo6kh7lYQpiCWW02q',
              object: 'line_item',
              amount: 50,
              amount_excluding_tax: 50,
              currency: 'usd',
              description: 'Test Transaction',
              discount_amounts: [],
              discountable: true,
              discounts: [],
              invoice_item: 'ii_1MqItaDlo6kh7lYQpiCWW02q',
              livemode: true,
              metadata: {},
              period: {
                end: 1679934317,
                start: 1679934317,
              },
              plan: null,
              price: {
                id: 'price_1MqIrBDlo6kh7lYQZgt6DkK9',
                object: 'price',
                active: false,
                billing_scheme: 'per_unit',
                created: 1679934317,
                currency: 'usd',
                custom_unit_amount: null,
                livemode: true,
                lookup_key: null,
                metadata: {},
                nickname: null,
                product: 'prod_NbVsEA9ZHQTjcS',
                recurring: null,
                tax_behavior: 'unspecified',
                tiers_mode: null,
                transform_quantity: null,
                type: 'one_time',
                unit_amount: 50,
                unit_amount_decimal: '50',
              },
              proration: false,
              proration_details: {
                credited_items: null,
              },
              quantity: 1,
              subscription: null,
              tax_amounts: [],
              tax_rates: [],
              type: 'invoiceitem',
              unique_id: 'il_1MqItaDlo6kh7lYQP5oG8Xdc',
              unit_amount_excluding_tax: '50',
            },
          ],
          has_more: false,
          total_count: 1,
          url: '/v1/invoices/in_1MqItaDlo6kh7lYQePA5sWyu/lines',
        },
        livemode: true,
        metadata: {},
        next_payment_attempt: null,
        number: 'B75F62DA-0002',
        on_behalf_of: null,
        paid: false,
        paid_out_of_band: false,
        payment_intent: null,
        payment_settings: {
          default_mandate: null,
          payment_method_options: null,
          payment_method_types: null,
        },
        period_end: 1679934301,
        period_start: 1679934301,
        post_payment_credit_notes_amount: 0,
        pre_payment_credit_notes_amount: 0,
        quote: null,
        receipt_number: null,
        rendering_options: null,
        shipping_cost: null,
        shipping_details: null,
        starting_balance: 0,
        statement_descriptor: null,
        status: 'draft',
        status_transitions: {
          finalized_at: null,
          marked_uncollectible_at: null,
          paid_at: null,
          voided_at: null,
        },
        subscription: null,
        subtotal: 50,
        subtotal_excluding_tax: 50,
        tax: null,
        tax_percent: null,
        test_clock: null,
        total: 50,
        total_discount_amounts: [],
        total_excluding_tax: 50,
        total_tax_amounts: [],
        transfer_data: null,
        webhooks_delivered_at: null,
      },
    },
    livemode: true,
    pending_webhooks: 1,
    request: 'req_ewxcD5uEcrEeuT',
    type: 'invoice.created',
  };
  const contentType = 'json';

  const result = await handler(medplum, { input, contentType, secrets: {} });
  expect(result).toBeDefined();
});
