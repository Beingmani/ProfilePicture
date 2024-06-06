import React, { useState } from 'react';
import { Button, Form, Input, Image, Card , Row, Col} from 'antd';
import axios from 'axios';

const App = () => {
  const [imageUrls, setImageUrls] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [userInfo, setUserInfo] = useState(null);

  const generateProfilePicture = async (values) => {
    try {
      setLoading(true);
      const { favoriteFood, favoriteAnimal, favoriteColor } = values;
       const prompt = `${favoriteColor} monochromatic minimalist portrait of a ${favoriteAnimal} head with a random, strong facial expression in a simplistic cartoon style with satirical humor, simple details, and rounded minimalist shapes, wearing ${favoriteFood} as accessories.`;
      
      const response = await axios.post(
        'https://profile-picture-server-hmg9i4r3o-beingmanis-projects.vercel.app/1/generate-profile-picture',
        { prompt },
        { responseType: 'arraybuffer' }
      );

      const imageBlob = new Blob([response.data], { type: 'image/png' });
      const imageObjectUrl = URL.createObjectURL(imageBlob);
      setImageUrls(prevUrls => [...prevUrls, imageObjectUrl]);

      // Simulating user info (replace with actual user data)
      setUserInfo({
        firstName: 'John',
        lastName: 'Doe',
        bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
      });
    } catch (error) {
      console.error('Error generating image:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
    <div style={{ maxWidth: 400, margin: '0 auto', padding: 20 }}>
      <h1 style={{ textAlign: 'center', marginBottom: 20 }}>Generate Your Profile Picture</h1>
      <p style={{ textAlign: 'center' }}>Fill out the form below to create your custom profile picture.</p>
      <Form
        form={form}
        layout="vertical"
        onFinish={generateProfilePicture}
      >
        <Form.Item
          name="favoriteFood"
          label="Favorite Food"
          rules={[{ required: true, message: 'Please enter your favorite food' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="favoriteAnimal"
          label="Favorite Animal"
          rules={[{ required: true, message: 'Please enter your favorite animal' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="favoriteColor"
          label="Favorite Color"
          rules={[{ required: true, message: 'Please enter your favorite color' }]}
        >
          <Input />
        </Form.Item>
        <Form.Item style={{ textAlign: 'center' }}>
          <Button
            type="primary"
            htmlType="submit"
            loading={loading}
          >
            {loading ? 'Generating Profile Picture...' : 'Generate Profile Picture'}
          </Button>
        </Form.Item>
      </Form>
      </div>
      <div style={{ marginTop: 30 , width:'100%'}}>
        <h2 style={{ textAlign: 'center', marginBottom: 20 }}>Your Cards</h2>
        <Row gutter={[16, 16]} justify="center">
          {imageUrls.map((url, index) => (
            <Col xs={24} sm={12} md={8} lg={6} key={index}>
              <Card
                title="Your Profile Card"
                style={{ width: '100%' }}
                extra={<Button type="primary" onClick={() => { /* Logic for downloading the card image */ }}>Download</Button>}
              >
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <Image
                    src={url}
                    alt="Generated profile"
                    style={{ borderRadius: '50%', width: 120, height: 120, objectFit: 'cover', marginRight: 20 }}
                  />
                  <div>
                    {userInfo && (
                      <>
                        <p>{`${userInfo.firstName} ${userInfo.lastName}`}</p>
                        <p>{userInfo.bio}</p>
                      </>
                    )}
                  </div>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default App;
