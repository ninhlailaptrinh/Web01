'use client';

import { useState } from 'react';
import LoadingSpinner from './LoadingSpinner';

interface PaymentModalProps {
  service: {
    id: string;
    name: string;
    price: number;
    duration: string;
  };
  onClose: () => void;
  onSuccess: () => void;
}

const PaymentModal = ({ service, onClose, onSuccess }: PaymentModalProps) => {
  const [paymentMethod, setPaymentMethod] = useState('banking');
  const [isLoading, setIsLoading] = useState(false);

  const handlePayment = async () => {
    setIsLoading(true);
    try {
      // Mock API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      onSuccess();
    } catch (error) {
      console.error('Payment error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-lg p-8 max-w-md w-full mx-4">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-bold">Thanh toán dịch vụ</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="space-y-6">
          {/* Service Info */}
          <div className="bg-gray-700/50 p-4 rounded-lg">
            <div className="flex justify-between mb-2">
              <span>Dịch vụ:</span>
              <span className="font-medium">{service.name}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span>Thời hạn:</span>
              <span>{service.duration}</span>
            </div>
            <div className="flex justify-between text-lg font-bold">
              <span>Tổng tiền:</span>
              <span className="text-primary">{service.price.toLocaleString('vi-VN')}đ</span>
            </div>
          </div>

          {/* Payment Methods */}
          <div>
            <h4 className="font-medium mb-3">Phương thức thanh toán</h4>
            <div className="space-y-3">
              <label className="flex items-center p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-primary">
                <input
                  type="radio"
                  name="payment"
                  value="banking"
                  checked={paymentMethod === 'banking'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">Chuyển khoản ngân hàng</div>
                  <div className="text-sm text-gray-400">Chuyển khoản trực tiếp qua ngân hàng</div>
                </div>
              </label>

              <label className="flex items-center p-4 border border-gray-600 rounded-lg cursor-pointer hover:border-primary">
                <input
                  type="radio"
                  name="payment"
                  value="momo"
                  checked={paymentMethod === 'momo'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                  className="mr-3"
                />
                <div>
                  <div className="font-medium">Ví MoMo</div>
                  <div className="text-sm text-gray-400">Thanh toán qua ví điện tử MoMo</div>
                </div>
              </label>
            </div>
          </div>

          {/* Bank Details */}
          {paymentMethod === 'banking' && (
            <div className="bg-gray-700/50 p-4 rounded-lg text-sm">
              <h4 className="font-medium mb-2">Thông tin chuyển khoản:</h4>
              <div className="space-y-1">
                <p>Ngân hàng: <span className="font-medium">Vietcombank</span></p>
                <p>Số tài khoản: <span className="font-medium">1234567890</span></p>
                <p>Chủ tài khoản: <span className="font-medium">TECH VN</span></p>
                <p>Nội dung: <span className="font-medium">TECHVN {service.id}</span></p>
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handlePayment}
              disabled={isLoading}
              className="flex-1 btn-primary"
            >
              {isLoading ? <LoadingSpinner /> : 'Xác nhận thanh toán'}
            </button>
            <button
              onClick={onClose}
              disabled={isLoading}
              className="flex-1 btn-secondary"
            >
              Hủy
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentModal; 