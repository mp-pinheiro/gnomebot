import os

from dotenv import load_dotenv
from google.cloud import compute_v1

load_dotenv()

# constants
PROJECT_ID = os.getenv('PROJECT_ID')
ZONE = os.getenv('ZONE')
INSTANCE_GROUP = os.getenv('INSTANCE_GROUP')


def process(context):
    client = compute_v1.InstanceGroupManagersClient()
    managed_instances = client.list_managed_instances(
        project=PROJECT_ID, zone=ZONE, instance_group_manager=INSTANCE_GROUP)

    request = compute_v1.InstanceGroupManagersRecreateInstancesRequest()
    request.instances = [instance.instance for instance in managed_instances]
    client.recreate_instances(
        project=PROJECT_ID,
        zone=ZONE,
        instance_group_manager=INSTANCE_GROUP,
        instance_group_managers_recreate_instances_request_resource=request)

    return {
        'status': 'success',
        'message': f'Recreated instances in {INSTANCE_GROUP}',
        'instances': [instance.instance for instance in managed_instances]
    }
