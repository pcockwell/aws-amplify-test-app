import os
import json

import boto3

def get_s3_presigned_post_url(org, filename, expiry=3600):
  """
  Method to get post url from s3
  :param key: key of the file
  :return:
  """
  key = '/'.join([org, filename])
  try:
    presigned_post = boto3.client('s3').generate_presigned_post(
        os.environ['STORAGE_AMPLIFYTESTS3_BUCKETNAME'],
        key,
        ExpiresIn=expiry
    )
    return {
      'upload_url': presigned_post['url'],
      'fields': presigned_post['fields']
    }
  except Exception as e:
    return {
      'error': 'Unable to upload PDF'
    }


def handler(event, context):
  file_details = event['queryStringParameters']
  organization = event['requestContext']['authorizer']['claims']['custom:organization']
  presigned_url_details = get_s3_presigned_post_url(organization, file_details['name'])
  return {
    'statusCode': 200,
    'headers': {
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Origin': 'https://main.dx0x4jcfvd33i.amplifyapp.com',
        'Access-Control-Allow-Methods': 'OPTIONS,POST,GET'
    },
    'body': json.dumps(presigned_url_details)
  }
