// param region string = 'japaneast'
// param rg_name string = 'murashige-test'

targetScope = 'subscription'

param resourceGroupName string
param resourceGroupLocation string

resource resourceGroup 'Microsoft.Resources/resourceGroups@2024-11-01' = {
    name: resourceGroupName
    location: resourceGroupLocation
}
