def handler(event, context):
  print('received event:')
  print(event)
  print(event.body)
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': '*',
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': "Hello from your new Amplify Python lambda!"
  }
