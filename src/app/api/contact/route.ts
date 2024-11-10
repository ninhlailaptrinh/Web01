import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    
    // Validate dữ liệu
    if (!body.email || !body.name || !body.message) {
      return NextResponse.json(
        { success: false, message: 'Vui lòng điền đầy đủ thông tin' },
        { status: 400 }
      );
    }

    // Mock gửi email
    console.log('Sending email with data:', body);
    
    // Trả về response thành công
    return NextResponse.json({ 
      success: true, 
      message: 'Gửi liên hệ thành công! Chúng tôi sẽ phản hồi sớm nhất có thể.' 
    });
  } catch (error) {
    console.error('Contact error:', error);
    return NextResponse.json(
      { success: false, message: 'Có lỗi xảy ra, vui lòng thử lại sau' },
      { status: 500 }
    );
  }
} 