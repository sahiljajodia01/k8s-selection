import yaml
import io

# Define data
data = {'a list': [1, 42, 3.141, 1337, 'help', u'€'],
        'a string': 'bla',
        'another dict': {'foo': 'bar',
                         'key': 'value',
                         'the answer': 42}}
current_context = 'docker-for-desktop'
load = {}
# Write YAML file
with io.open('config', 'r', encoding='utf8') as stream:
    load = yaml.safe_load(stream)

print(load)
    
load['current-context'] = current_context

with io.open('config', 'w', encoding='utf8') as out:
    yaml.dump(load, out, default_flow_style=False, allow_unicode=True)




# Read YAML file
# with open("data.yaml", 'r') as stream:
#     data_loaded = yaml.safe_load(stream)

# print(data == data_loaded)