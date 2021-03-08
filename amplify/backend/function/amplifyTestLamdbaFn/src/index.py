def handler(event, context):
  print('received event:')
  print(event)
  print(event.body)
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Origin': 'https://main.dx0x4jcfvd33i.amplifyapp.com/',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET,PUT'
      },
      'body': "Hello from your new Amplify Python lambda!"
  }
