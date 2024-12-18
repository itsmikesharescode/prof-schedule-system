<script lang="ts">
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { buttonVariants } from '$lib/components/ui/button';
	import Check from 'lucide-svelte/icons/check';
	import Download from 'lucide-svelte/icons/download';
	import { tick } from 'svelte';
	import * as Command from '$lib/components/ui/command/index.js';
	import type { ClassSchedulesPageTable } from '../data/schemas';

	interface Props {
		data: ClassSchedulesPageTable[];
	}

	const { data }: Props = $props();

	const rooms = [
		{
			value: 'Room 101',
			label: 'Room 101'
		},
		{
			value: 'Room 102',
			label: 'Room 102'
		},
		{
			value: 'Room 103',
			label: 'Room 103'
		},
		{
			value: 'Room 104',
			label: 'Room 104'
		},
		{
			value: 'Room 105',
			label: 'Room 105'
		},
		{
			value: 'Room 106',
			label: 'Room 106'
		},
		{
			value: 'Room 107',
			label: 'Room 107'
		},
		{
			value: 'Room 108',
			label: 'Room 108'
		},
		{
			value: 'Room 109',
			label: 'Room 109'
		},
		{
			value: 'Room 110',
			label: 'Room 110'
		}
	];

	let value = $state('');
	let triggerRef = $state<HTMLButtonElement>(null!);

	class SelectedRoomState {
		#selectedItems = $state<typeof rooms>([]);

		add(roomValue: (typeof rooms)[number]) {
			const deepCopy = this.#selectedItems.map((item) => item.value);
			if (deepCopy.includes(roomValue.value)) {
				this.#selectedItems = this.#selectedItems.filter((item) => item.value !== roomValue.value);
				return;
			}

			this.#selectedItems.push(roomValue);
		}

		get() {
			return this.#selectedItems;
		}

		checkChecks(value: string) {
			const deepCopy = this.#selectedItems.map((item) => item.value);
			if (deepCopy.includes(value)) {
				return '';
			}

			return 'text-transparent';
		}
	}

	const selectedRoomState = new SelectedRoomState();

	function closeAndFocusTrigger() {
		tick().then(() => {
			triggerRef.focus();
		});
	}
</script>

<DropdownMenu.Root>
	<DropdownMenu.Trigger class={buttonVariants({ variant: 'outline', size: 'sm' })}>
		Download Rooms <Download />
	</DropdownMenu.Trigger>
	<DropdownMenu.Content>
		<DropdownMenu.Group>
			<DropdownMenu.GroupHeading>Choose option</DropdownMenu.GroupHeading>
			<DropdownMenu.Separator />
			<DropdownMenu.Sub>
				<DropdownMenu.SubTrigger>
					<span>Download Specific Room</span>
				</DropdownMenu.SubTrigger>
				<DropdownMenu.SubContent sideOffset={10} class="mt-20">
					<Command.Root>
						<Command.Input placeholder="Search room..." />
						<Command.List>
							<Command.Empty>No room found</Command.Empty>
							<Command.Group>
								{#each rooms as room}
									<Command.Item
										value={room.label}
										onSelect={() => {
											value = room.value;
											selectedRoomState.add(room);

											closeAndFocusTrigger();
										}}
									>
										<Check class={selectedRoomState.checkChecks(room.value)} />
										{room.label}
									</Command.Item>
								{/each}
							</Command.Group>
						</Command.List>
					</Command.Root>
					{#if selectedRoomState.get().length}
						<DropdownMenu.Item class="mt-5 ">
							<Download />
							<span>Download Selections</span>
						</DropdownMenu.Item>
					{/if}
				</DropdownMenu.SubContent>
			</DropdownMenu.Sub>

			<DropdownMenu.Item>
				<Download />
				Download All
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
