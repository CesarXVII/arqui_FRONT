import React, { useState } from 'react';
import {
  Modal, Input, Select, message, Form,
} from 'antd';
import { cardService } from '../../services/cardService';

const { Option } = Select;

const AddCardModal = ({
  visible, onCancel, onSuccess, usuarioId,
}) => {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      setLoading(true);

      const cardNumber = values.numero.replace(/\s/g, '');

      const cardData = {
        usuarioId,
        numero: cardNumber,
        marca: values.marca,
        tipo: values.tipo,
        expMes: values.expMes,
        expAno: values.expAno,
        cvc: values.cvc,
        nombrePropietario: values.nombrePropietario,
        direccion: values.direccion,
      };

      await cardService.registerCard(cardData);

      message.success('Tarjeta registrada correctamente');
      form.resetFields();
      onSuccess();
    } catch (error) {
      if (error.errorFields) {
        message.warning('Por favor completa todos los campos');
      } else {
        message.error(error.message || 'Error al registrar la tarjeta');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    form.resetFields();
    onCancel();
  };

  const formatCardNumber = (value) => {
    const digits = value.replace(/\D/g, '');
    const formatted = digits.match(/.{1,4}/g)?.join(' ') || digits;
    return formatted;
  };

  const handleCardNumberChange = (e) => {
    const formatted = formatCardNumber(e.target.value);
    form.setFieldsValue({ numero: formatted });
  };

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => currentYear + i);

  return (
    <Modal
      title="Agregar Tarjeta de Crédito/Débito"
      open={visible}
      onOk={handleSubmit}
      onCancel={handleCancel}
      confirmLoading={loading}
      okText="Agregar Tarjeta"
      cancelText="Cancelar"
      width={600}
      style={{ top: 20 }}
      styles={{
        body: {
          maxHeight: 'calc(100vh - 200px)',
          overflowY: 'auto',
          paddingRight: '8px',
        },
      }}
    >
      <Form
        form={form}
        layout="vertical"
        initialValues={{
          tipo: 'Débito',
          marca: 'visa',
          numero: '4242 4242 4242 4242',
          expMes: 12,
          expAno: currentYear + 2,
          cvc: '123',
          nombrePropietario: '',
          direccion: '',
        }}
      >
        <Form.Item
          label="Nombre del propietario"
          name="nombrePropietario"
          rules={[{ required: true, message: 'Ingresa el nombre del propietario' }]}
        >
          <Input placeholder="Nombre completo como aparece en la tarjeta" />
        </Form.Item>

        <Form.Item
          label="Marca"
          name="marca"
          rules={[{ required: true, message: 'Selecciona la marca' }]}
        >
          <Select>
            <Option value="visa">Visa</Option>
            <Option value="mastercard">Mastercard</Option>
            <Option value="amex">American Express</Option>
            <Option value="discover">Discover</Option>
            <Option value="diners">Diners Club</Option>
            <Option value="jcb">JCB</Option>
          </Select>
        </Form.Item>

        <Form.Item
          label="Número de tarjeta"
          name="numero"
          rules={[
            { required: true, message: 'Ingresa el número de tarjeta' },
            {
              validator: (_, value) => {
                const digits = value?.replace(/\s/g, '');
                if (digits && digits.length >= 13) {
                  return Promise.resolve();
                }
                return Promise.reject(new Error('Número de tarjeta inválido'));
              },
            },
          ]}
        >
          <Input
            placeholder="4242 4242 4242 4242"
            maxLength={19}
            onChange={handleCardNumberChange}
          />
        </Form.Item>

        <Form.Item
          label="Tipo"
          name="tipo"
          rules={[{ required: true, message: 'Selecciona el tipo' }]}
        >
          <Select>
            <Option value="Débito">Débito</Option>
            <Option value="Crédito">Crédito</Option>
          </Select>
        </Form.Item>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
          <Form.Item
            label="Mes de expiración"
            name="expMes"
            rules={[{ required: true, message: 'Requerido' }]}
          >
            <Select>
              {Array.from({ length: 12 }, (_, i) => i + 1).map((month) => (
                <Option key={month} value={month}>
                  {String(month).padStart(2, '0')}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="Año de expiración"
            name="expAno"
            rules={[{ required: true, message: 'Requerido' }]}
          >
            <Select>
              {years.map((year) => (
                <Option key={year} value={year}>
                  {year}
                </Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item
            label="CVC/CVV"
            name="cvc"
            rules={[
              { required: true, message: 'Requerido' },
              {
                validator: (_, value) => {
                  const digits = value?.replace(/\D/g, '');
                  if (digits && (digits.length === 3 || digits.length === 4)) {
                    return Promise.resolve();
                  }
                  return Promise.reject(new Error('3 o 4 dígitos'));
                },
              },
            ]}
          >
            <Input
              placeholder="123"
              maxLength={4}
            />
          </Form.Item>
        </div>

        <Form.Item
          label="Dirección de facturación"
          name="direccion"
          rules={[{ required: true, message: 'Ingresa la dirección de facturación' }]}
        >
          <Input.TextArea
            placeholder="Dirección completa incluyendo ciudad y código postal"
            rows={3}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default AddCardModal;