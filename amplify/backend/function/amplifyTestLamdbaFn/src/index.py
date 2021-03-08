def handler(event, context):
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Origin': 'https://main.dx0x4jcfvd33i.amplifyapp.com',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': "Hello from your new Amplify Python lambda!"
  }
