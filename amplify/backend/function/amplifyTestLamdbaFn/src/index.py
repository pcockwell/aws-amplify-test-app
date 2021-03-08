import json
import os

import boto3
from botocore.exceptions import ClientError

def get_s3_presigned_post_url(org, filename, expiry=3600):
    """
    Method to get post url from s3
    :param key: key of the file
    :return:
    """
    key = '/'.join([org, filename])
    print(key)
    try:
        presigned_post = boto3.client('s3').generate_presigned_post(
            os.environ['STORAGE_AMPLIFYTESTS3_BUCKETNAME'],
            key,
            ExpiresIn=expiry
        )
        return SimpleNamespace(success=True, data={
            'upload_url': presigned_post['url'],
            'fields': presigned_post['fields']
        })
    except ClientError:
        return SimpleNamespace(
            success=False,
            error='Unable to upload PDF'
        )


def get_user_organization(identity):
  client = boto3.client('cognito-idp')
  print(identity)
  user = client.get_user(AccessToken=identity['accessKey'])
  organization = None
  for attribute in user['UserAttributes']:
    if attribute['Name'] = 'custom:organization':
      organization = attribute['Value']
      break
  print(user)
  print(organization)
  return organization


def handler(event, context):
  body = json.loads(event['body'])
  organization = event['requestContext']['identity']
  presigned_url_details = get_s3_presigned_post_url(organization, body['name'])
  print(presigned_url_details)
  return {
      'statusCode': 200,
      'headers': {
          'Access-Control-Allow-Headers': 'Content-Type',
          'Access-Control-Allow-Origin': 'https://main.dx0x4jcfvd33i.amplifyapp.com',
          'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
      },
      'body': presigned_url_details
  }
