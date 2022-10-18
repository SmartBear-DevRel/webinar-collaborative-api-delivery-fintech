$path = "./provider_azure_function/Models/OpenAPI"
$files = get-ChildItem $path 
#$files  #use this to just display all the filenames 
foreach ($file in $files) 
{
   Write-Host "`n`fixing file= $($file.Name)"
   $filetext = Get-Content $file.FullName -Raw   
   # The -Raw (line above) option brings all text into a string, without dividing into lines 
   Write-Host "Old Text in file: $($file.Name)" 
   Write-Host $filetext

   #change namespace to match project structure
   $filetextNew = $filetext     -replace "namespace IO.Swagger.Models",        "namespace SmartBearCoin.CustomerManagement.Models.OpenAPI"

   Write-Host "NEW:" 
   Write-Host $filetext 
   Set-Content $file.FullName $filetextNew
}