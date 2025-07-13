<template>
    <div class="fixed inset-0 z-50 bg-black/40 flex items-center justify-center">
        <div class="bg-white rounded-xl shadow-lg p-4 w-[340px] relative max-h-[90vh] overflow-auto">
            <!-- Nút đóng -->
            <button @click="$emit('close')"
                class="absolute top-2 right-2 text-gray-600 hover:text-black text-xl">×</button>


            <div id="print-section" class="w-[320px] p-4 text-sm font-sans border border-gray-400 mx-auto bg-white">
                <div class="text-center font-bold text-lg">HP Macrame</div>
                <div class="text-center">Dĩ An,Bình Dương</div>

                <div class="text-center font-bold uppercase">HÓA ĐƠN THANH TOÁN</div>
                <div class="text-center text-xs mb-2">Mã: {{ order.order_code }}</div>

                <div class="mb-2">
                    <p>Ngày: {{ formatDate(order.created_at) }}</p>
                    <p>Khách hàng: {{ order.buyer_name }}</p>
                    <p>Mã số thuế: {{ order.buyer_tax_code || "---" }}</p>
                    <p>Địa chỉ nhận hàng: {{ order.shipping_address }}</p>
                </div>

                <!-- Danh sách sản phẩm -->
                <table style="width: 100%; font-family: monospace; font-size: 12px; border-collapse: collapse;">
                    <thead>
                        <tr style="border-bottom: 1px dashed #000;">
                            <th style="width: 5%; text-align: left;">#</th>
                            <th style="width: 35%; text-align: left;">Tên</th>
                            <th style="width: 5%; text-align: right;">SL</th>
                            <th style="width: 25%; text-align: right;">ĐG</th>
                            <th style="width: 30%; text-align: right;">TT</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="(item, index) in order.items" :key="index">
                            <td>{{ index + 1 }}</td>
                            <td>
                                {{ item.product_name }}
                                <div v-if="item.note" class="text-xs text-gray-500">
                                    ({{ parseNote(item.note) }})
                                </div>
                            </td>
                            <td style="text-align: right;">{{ item.quantity }}</td>
                            <td style="text-align: right;">{{ formatMoney(item.unit_price) }}</td>
                            <td style="text-align: right;">{{ formatMoney(item.unit_price * item.quantity) }}</td>
                        </tr>
                    </tbody>
                </table>

                <div style="border-bottom: 1px dashed #000;padding: 5px"></div>
                <br>
                <!-- Tổng -->

                <table class="w-full mt-2" style="font-size: 14px;">
                    <tbody>
                        <tr>
                            <td>Tổng tiền trước thuế:</td>
                            <td class="text-right font-mono">{{ formatMoney(order.total_price_before_tax) }}</td>
                        </tr>
                        <tr>
                            <td>Thuế GTGT (10%):</td>
                            <td class="text-right font-mono">{{ formatMoney(order.vat_amount) }}</td>
                        </tr>
                        <tr>
                            <td>Phí ship:</td>
                            <td class="text-right font-mono">{{ formatMoney(order.shipping_fee) }}</td>
                        </tr>
                        <tr>
                            <td>Giảm giá:</td>
                            <td class="text-right font-mono">{{ formatMoney(order.discount_amount) }}</td>
                        </tr>
                        <tr class="border-t border-b font-bold text-base">
                            <td class="py-2">Tổng thanh toán:</td>
                            <td class="text-right py-2 font-mono">{{ formatMoney(order.total_price) }}</td>
                        </tr>
                    </tbody>
                </table>

                <!-- Ghi chú và QR -->
                <div class="text-xs mt-2 pt-2">
                    <p>Hóa đơn điện tử xuất từ hệ thống</p>
                    <p>Mã tra cứu: {{ order.order_code }}</p>
                    <p>Tra cứu tại: <a href="`http://localhost:3000/?search=${order.order_code}`"
                            class="text-blue-600 underline"> {{ `http://localhost:3000/?search=${order.order_code}`
                            }}</a></p>
                </div>
            </div>

            <!-- Nút in -->
            <div class="text-center mt-4">
                <button @click="print" class="px-4 py-2 bg-blue-500 text-white rounded">🖨️ In hóa đơn</button>
            </div>
        </div>
    </div>
</template>

<script setup>
const props = defineProps({
    order: {
        type: Object,
        required: true
    }
})
const parseNote = (noteText) => {
    try {
        const obj = JSON.parse(noteText)
        return Object.values(obj).join(', ')
    } catch {
        return ''
    }
}
const formatDate = (dateStr) => {
    const date = new Date(dateStr)
    return date.toLocaleDateString('vi-VN') + ' ' + date.toLocaleTimeString('vi-VN')
}

const formatMoney = (num) => {
    return new Intl.NumberFormat('vi-VN').format(num) + ' đ'
}

const print = () => {
    const content = document.getElementById('print-section').innerHTML

    const style = `
    <style>
      body {
        font-family: monospace;
        font-size: 12px;
        width: 320px;
        margin: 0 auto;
        padding: 0;
      }
      .text-center { text-align: center; }
      .text-right { text-align: right; }
      .font-bold { font-weight: bold; }
      table { width: 100%; border-collapse: collapse; margin: 8px 0; }
      th, td {
        border: none;
        padding: 2px 0;
        font-size: 12px;
      }
      .line { border-top: 1px dashed #000; margin: 4px 0; }
      .total { font-size: 14px; font-weight: bold; margin-top: 8px; }
      .small { font-size: 10px; }
    </style>
  `

    const printWindow = window.open('', '', 'width=600,height=800')
    printWindow.document.write(`<html><head><title>In hóa đơn</title>${style}</head><body>${content}</body></html>`)
    printWindow.document.close()
    printWindow.focus()
    printWindow.print()
    printWindow.close()
}
</script>
<style scoped>
/* Áp dụng cho cả giao diện và in */
.flex {
    display: flex;
}

.justify-between {
    justify-content: space-between;
}

.text-right {
    text-align: right;
}

.amount-value {
    min-width: 80px;
    text-align: right;
    display: inline-block;
}

* {
    font-family: monospace;
    font-size: 12px;
    line-height: 1.4;
}

.text-bold {
    font-weight: bold;
}

.text-right {
    text-align: right;
}

.text-center {
    text-align: center;
}

.text-xs {
    font-size: 10px;
}

@media print {
    body {
        margin: 0;
        padding: 0;
    }

    .no-print {
        display: none !important;
    }
}
</style>