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

	let triggerRef = $state<HTMLButtonElement>(null!);

	class SelectedRoomState {
		#selectedItems = $state<typeof data>([]);

		add(roomValue: (typeof data)[number]) {
			const deepCopy = this.#selectedItems.map((item) => item.rooms_tb.code);
			if (deepCopy.includes(roomValue.rooms_tb.code)) {
				this.#selectedItems = this.#selectedItems.filter(
					(item) => item.rooms_tb.code !== roomValue.rooms_tb.code
				);
				return;
			}

			this.#selectedItems.push(roomValue);
		}

		get() {
			return this.#selectedItems;
		}

		checkChecks(value: string) {
			const deepCopy = this.#selectedItems.map((item) => item.rooms_tb.code);
			if (deepCopy.includes(value)) {
				return '';
			}

			return 'text-transparent';
		}
	}

	const selectedRoomState = new SelectedRoomState();

	const handleDownloadAll = () => {
		// Group data by room code
		const groupedData = data.reduce(
			(acc, item) => {
				const roomCode = item.rooms_tb.code;

				// Find existing group or create new one
				const existingGroup = acc.find((group) => group.roomCode === roomCode);

				if (existingGroup) {
					existingGroup.datas.push(item);
				} else {
					acc.push({
						roomCode,
						datas: [item]
					});
				}

				return acc;
			},
			[] as Array<{ roomCode: string; datas: typeof data }>
		);

		// Sort groups by room code
		console.log($state.snapshot(groupedData.sort((a, b) => a.roomCode.localeCompare(b.roomCode))));
	};

	const handleDownloadSpecific = () => {
		const selectedData = selectedRoomState.get();

		// Group selected data by room code
		const groupedData = selectedData.reduce(
			(acc, item) => {
				const roomCode = item.rooms_tb.code;

				// Find existing group or create new one
				const existingGroup = acc.find((group) => group.roomCode === roomCode);

				if (existingGroup) {
					existingGroup.datas.push(item);
				} else {
					acc.push({
						roomCode,
						datas: [item]
					});
				}

				return acc;
			},
			[] as Array<{ roomCode: string; datas: typeof data }>
		);

		// Sort groups by room code
		console.log($state.snapshot(groupedData.sort((a, b) => a.roomCode.localeCompare(b.roomCode))));
	};
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
						<Command.Input placeholder="Search by room code" />
						<Command.List>
							<Command.Empty>No room found</Command.Empty>
							<Command.Group>
								{#each data as dataCopy}
									<Command.Item
										value={dataCopy.rooms_tb.code}
										onSelect={() => {
											selectedRoomState.add(dataCopy);
										}}
									>
										<Check class={selectedRoomState.checkChecks(dataCopy.rooms_tb.code)} />
										<div class="flex flex-col">
											<span>{dataCopy.rooms_tb.code}</span>
											<span class="text-xs text-muted-foreground"
												>{dataCopy.rooms_tb.type} / {dataCopy.rooms_tb.number}</span
											>
										</div>
									</Command.Item>
								{/each}
							</Command.Group>
						</Command.List>
					</Command.Root>
					{#if selectedRoomState.get().length}
						<DropdownMenu.Item class="mt-5 " onclick={handleDownloadSpecific}>
							<Download />
							<span>Download Selections</span>
						</DropdownMenu.Item>
					{/if}
				</DropdownMenu.SubContent>
			</DropdownMenu.Sub>

			<DropdownMenu.Item onclick={handleDownloadAll}>
				<Download />
				Download All
			</DropdownMenu.Item>
		</DropdownMenu.Group>
	</DropdownMenu.Content>
</DropdownMenu.Root>
