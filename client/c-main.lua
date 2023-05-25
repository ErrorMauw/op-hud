local QBCore = exports['qb-core']:GetCoreObject()

local isLoggedIn = false
local isHudOpen = false

local blood = 0
local hunger = 100
local thirst = 100

if not Config.Minimap then
    DisplayRadar(false)
end

-- NetEvents

RegisterNetEvent("QBCore:Client:OnPlayerLoaded", function()
    UiShow(true)
    isLoggedIn = true
end)

AddEventHandler('onResourceStart', function(resourceName)
    if GetCurrentResourceName() ~= resourceName then
        return
    end
    Wait(2000)
    UiShow(true)
    isLoggedIn = true
end)

RegisterNetEvent("QBCore:Client:OnPlayerUnload", function()
    UiShow(false)
    isLoggedIn = false
end)

RegisterNetEvent("hud:client:UpdateNeeds")
AddEventHandler("hud:client:UpdateNeeds", function(newHunger, newThirst)
    hunger = newHunger
    thirst = newThirst
end)

RegisterNetEvent('seatbelt:client:ToggleSeatbelt', function() -- Triggered in smallresources
    seatbeltOn = not seatbeltOn
end)

RegisterNetEvent('seatbelt:client:ToggleCruise', function()
    cruiseOn = not cruiseOn
end)

-- Events

Citizen.CreateThread(function()
    while true do
        if isLoggedIn then
            if isHudOpen then
                local oxygen = GetPlayerUnderwaterTimeRemaining(PlayerId()) * 10 or 100

                SendNUIMessage({
                    type = "updatehud",
                    health = GetEntityHealth(PlayerPedId()),
                    thirst = thirst,
                    hunger = hunger,
                    bleeding = blood,
                    oxygen = oxygen
                })

                Citizen.Wait(Config.UpdateTime)
            end
        else
            Citizen.Wait(500)
        end
    end
end)

Citizen.CreateThread(function()
    while true do
        if isLoggedIn then
            if isHudOpen then
                QBCore.Functions.TriggerCallback('hospital:GetPlayerBleeding', function(playerBleeding)
                    if playerBleeding == 0 then
                        blood = 0
                    elseif playerBleeding == 1 then
                        blood = 25
                    elseif playerBleeding == 2 then
                        blood = 50
                    elseif playerBleeding == 3 then
                        blood = 75
                    elseif playerBleeding == 4 then
                        blood = 100
                    end
                end)
            end
        end

        Citizen.Wait(2500)
    end
end)

Citizen.CreateThread(function()
	while true do
		if isLoggedIn then
			if IsControlJustPressed(0, 137) then
                SecShow(true)
			end
			if IsControlJustReleased(0, 137) then
                SecShow(false)
			end
		else
			Citizen.Wait(1000)
		end
		Citizen.Wait(1)
	end
end)

-- Functions

UiShow = function(bool)
    isHudOpen = bool
    SendNUIMessage({
        type = 'ui',
        action = bool
    })
end

SecShow = function(bool)
    SendNUIMessage({
        type = 'zui',
        action = bool
    })
    UiFocus(bool, bool)
end

UiFocus = function(kb, ms, st)
    HsFocus = kb or ms

    SetNuiFocus(kb, ms)
    SetNuiFocusKeepInput(HsFocus)

    if HsFocus then
        Citizen.CreateThread(function()
            while HsFocus do
                if kb then
					if st then
						DisableAllControlActions(0)
						EnableControlAction(0, 249, true)
						EnableControlAction(0, 137, true)
						EnableControlAction(0, 38, true)
					else
						DisableControlAction(0, 1, true)
						DisableControlAction(0, 2, true)
						DisableControlAction(0, 24, true)
						DisableControlAction(0, 25, true)
						DisableControlAction(1, 24, true)
						DisableControlAction(1, 25, true)
						DisableControlAction(0, 142, true)
						DisableControlAction(0, 200, true)
						DisablePlayerFiring(PlayerId(), true)
					end                   
                end

                if not kb and ms then
                    DisableControlAction(0, 1, true)
                    DisableControlAction(0, 2, true)
                elseif kb and not ms then
                    EnableControlAction(0, 1, true)
                    EnableControlAction(0, 2, true)
                end

                Citizen.Wait(0)
			end

			local tm = 20
			while tm > 0 do
				tm = tm - 1
				DisableControlAction(0, 24, true)
				DisableControlAction(0, 25, true)
				DisableControlAction(0, 142, true)
				DisablePlayerFiring(PlayerId(), true)
				Citizen.Wait(0)
			end
        end)
    end
end